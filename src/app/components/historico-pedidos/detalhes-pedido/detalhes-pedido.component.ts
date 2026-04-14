import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { forkJoin, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Models e Services
import { Carrinho } from 'src/app/model/carrinho';
import { RequisicoesService } from 'src/app/services/requisicoes.service';

@Component({
  selector: 'app-detalhes-pedido',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.css']
})
export class DetalhesPedidoComponent implements OnInit {
  private requisicoes = inject(RequisicoesService);

  // No modo strict, o '!' indica que a variável será inicializada pelo Angular via Input
  @Input({ required: true }) pedido!: any;

  public produtos: Carrinho[] = [];
  public dataEntrega?: Date;
  public desconto: number = 0;

  ngOnInit(): void {
    this.carregarProdutos();
    this.calcularPrevisaoEntrega();
  }

  private carregarProdutos(): void {
    if (!this.pedido?.itens || this.pedido.itens.length === 0) return;

    const pedidosDeProdutos = this.pedido.itens.map((item: any) =>
      this.requisicoes.buscarProduto(item.codProduto).pipe(
        map(produto => new Carrinho(produto, item.quantidade)),
        // Tratamento de erro individual para não quebrar o forkJoin inteiro
        catchError(() => of(null))
      )
    );

    forkJoin(pedidosDeProdutos).subscribe({
      next: (resultado: any) => {
        // Filtra nulos (casos onde a API falhou para um item específico)
        this.produtos = resultado.filter((p: any) => p !== null);
        this.calcularDesconto();
      },
      error: (err) => console.error('Erro crítico ao carregar produtos', err)
    });
  }

  private calcularDesconto(): void {
    if (this.pedido?.cupom && this.produtos.length > 0) {

      const subTotal = this.produtos.reduce((acc, item) => {
        const valor = item.produto?.valorProduto ?? 0;

        const qtd = item.quantidade ?? 0;

        return acc + (qtd * valor);
      }, 0);

      const percentualDesconto = this.pedido.cupom.desconto ?? 0;
      this.desconto = subTotal * (percentualDesconto / 100);
    }
  }

  private calcularPrevisaoEntrega(): void {
    if (!this.pedido || this.pedido.dataEntrega) return;

    const dataBase = new Date(this.pedido.dtPedido);
    const diasAdicionais = this.obterDiasFrete(this.pedido.vlFrete ?? 0);

    dataBase.setDate(dataBase.getDate() + diasAdicionais);
    this.dataEntrega = dataBase;
  }

  private obterDiasFrete(valorFrete: number): number {
    const tabelaFrete: Record<number, number> = { 10: 15, 20: 7, 30: 3 };
    return tabelaFrete[valorFrete] ?? 0;
  }
}