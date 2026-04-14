import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { forkJoin, map } from 'rxjs';

// Ngx-Bootstrap
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

// Services & Models
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { StorageService } from 'src/app/services/storage.service';
import { Compra } from 'src/app/model/compra';
import { Carrinho } from 'src/app/model/carrinho';

// Sub-componentes
import { DetalhesPedidoComponent } from '../detalhes-pedido/detalhes-pedido.component';
import { EnderecoComponent } from '../../checkout/endereco/endereco.component';
import { ProgressoPedidoComponent } from '../progresso-pedido/progresso-pedido.component';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePipe,
    ModalModule,
    DetalhesPedidoComponent,
    EnderecoComponent,
    ProgressoPedidoComponent
  ],
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  private requisicoes = inject(RequisicoesService);
  private modalService = inject(BsModalService);
  private storage = inject(StorageService);
  private route = inject(Router);

  public pedidos: Compra[] = [];
  public modalRef?: BsModalRef;
  public cancPedido?: Compra;
  public detPedido?: Compra;
  public enderecoPedido: any;

  ngOnInit(): void {
    this.carregarPedidos();
  }

  private carregarPedidos(): void {
    this.requisicoes.getPedidos().subscribe({
      next: (dados) => this.pedidos = dados ?? [],
      error: () => alert("Erro ao acessar pedidos")
    });
  }

  public calcularPrevisao(pedido: Compra): Date {
    const data = new Date(pedido.dtPedido ?? '');
    const freteMap: Record<number, number> = { 10: 15, 20: 7, 30: 3 };
    const dias = freteMap[pedido.vlFrete ?? 0] ?? 0;
    data.setDate(data.getDate() + dias);
    return data;
  }

  public abrirModalCancelamento(template: TemplateRef<any>, pedido: Compra): void {
    this.cancPedido = pedido;
    this.modalRef = this.modalService.show(template);
  }

  public abrirModalDetalhes(template: TemplateRef<any>, pedido: Compra): void {
    this.detPedido = pedido;
    // Buscamos o endereço e abrimos o modal somente quando tivermos o dado
    this.requisicoes.endereco(pedido.codEndereco).subscribe(endereco => {
      this.enderecoPedido = endereco;
      this.modalRef = this.modalService.show(template);
    });
  }

  public cancelarPedidoFuncao(): void {
    const idPedido = this.cancPedido?.codPedido;

    if (!idPedido) return;

    this.requisicoes.cancelarPedido(idPedido).subscribe(dados => {
      const index = this.pedidos.findIndex(p => p.codPedido === idPedido);
      if (index !== -1) this.pedidos[index] = dados;
      this.modalRef?.hide();
    });
  }

  public refazerPedido(pedido: Compra): void {
    if (!pedido.itensPedido) return;

    // Usamos forkJoin para garantir que todos os produtos sejam carregados antes de ir para o checkout
    const buscas = pedido.itensPedido.map(item =>
      this.requisicoes.buscarProduto(item.codProduto).pipe(
        map(produto => new Carrinho(produto, item.quantidade ?? 1))
      )
    );

    forkJoin(buscas).subscribe(carrinhoNovo => {
      this.storage.salvarCarrinho(carrinhoNovo);
      this.route.navigate(['/checkout']).then(() => {
        window.scrollTo(0, 0);
      });
    });
  }
}