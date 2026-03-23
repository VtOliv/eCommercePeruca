import { Component, OnInit, TemplateRef, inject, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Ngx-Bootstrap
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

// Services & Models
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { StorageService } from 'src/app/services/storage.service';
import { CadastrosService } from 'src/app/services/cadastros.service';
import { Endereco } from 'src/app/model/endereco';
import { Carrinho } from 'src/app/model/carrinho';
import { Cupom } from 'src/app/model/cupom';

// Componentes Standalone (Certifique-se de que os nomes batem com seus arquivos)
import { NavCheckoutComponent } from '../nav-checkout/nav-checkout.component';
import { EnderecoComponent } from '../endereco/endereco.component';
import { FormaEnvioComponent } from '../forma-envio/forma-envio.component';
import { DadosPagamentoComponent } from '../dados-pagamento/dados-pagamento.component';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule, 
    CurrencyPipe, 
    ModalModule,
    NavCheckoutComponent,
    EnderecoComponent,
    FormaEnvioComponent,
    DadosPagamentoComponent,
    CarrinhoComponent,
    FooterComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private requisicoes = inject(RequisicoesService);
  private modalService = inject(BsModalService);
  private storage = inject(StorageService);
  private cadastros = inject(CadastrosService);
  private route = inject(Router);

  private destroy$ = new Subject<void>();

  public modalRef?: BsModalRef;
  public enderecos: Endereco[] = [];
  public enderecoPrincipal: Endereco | null = null;
  public formaEnvio = 0;
  public total = 0;
  public subTotal = 0;
  public dadosDePagamento = false;
  public carrinho: Carrinho[] = [];
  public user: any;
  public cupomAtivo: Cupom | null = null;

  ngOnInit(): void {
    this.user = this.storage.recuperarUsuario();
    this.carrinho = this.storage.recuperarCarrinho() ?? [];

    if (!this.user) {
      alert("Você não está logado!");
      this.route.navigate(["/cadastre-se"]);
      return;
    }

    this.carregarEnderecos();
    this.atualizarTotais();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private carregarEnderecos() {
    this.requisicoes.buscarEndereco(this.user.codCliente)
      .pipe(takeUntil(this.destroy$))
      .subscribe(dados => {
        this.enderecos = dados;
        if (this.enderecos.length > 0) this.enderecoPrincipal = this.enderecos[0];
      });
  }

  // Substitui o setInterval: chamamos apenas quando algo muda
  private atualizarTotais() {
    this.subTotal = this.carrinho.reduce((acc, item) => 
      acc + (item.produto.valorProduto * item.quantidade), 0);
    
    const desconto = this.cupomAtivo ? (this.subTotal * (this.cupomAtivo.desconto / 100)) : 0;
    this.total = this.subTotal + this.formaEnvio - desconto;
  }

  receberFormaDeEnvio(valorFrete: number) {
    this.formaEnvio = valorFrete;
    this.atualizarTotais();
  }

  receberCupom(cupom: Cupom) {
    this.cupomAtivo = cupom;
    this.atualizarTotais();
  }

  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  mudarEndereco(endereco: Endereco) {
    this.enderecoPrincipal = endereco;
    this.modalRef?.hide();
  }

  validarCampos(templateErro: TemplateRef<any>) {
    if (this.enderecoPrincipal && this.formaEnvio !== 0 && this.carrinho.length > 0) {
      this.dadosDePagamento = true;
      // Aqui o Angular detectará a mudança e passará o true para o app-dados-pagamento
    } else {
      this.abrirModal(templateErro);
    }
  }

  finalizarCompra(pagamentoValido: boolean, templateErro: TemplateRef<any>) {
    if (pagamentoValido) {
      this.cadastros.cadastrarCompra(this.enderecoPrincipal, this.formaEnvio, this.total, this.cupomAtivo)
        .subscribe(dados => {
          if (dados) {
            this.finalizarProcesso(dados);
          }
        });
    } else {
      this.dadosDePagamento = false;
      this.abrirModal(templateErro);
    }
  }

  private finalizarProcesso(dadosCompra: any) {
    let cliente = this.storage.recuperarUsuario();
    if (!cliente.pedidos) cliente.pedidos = [];
    cliente.pedidos.push(dadosCompra);
    this.storage.salvarUsuario(cliente);
    this.storage.removerCarrinho();
    this.route.navigate(['/finalizar-compra']);
  }

  cadastrarEndereco(endereco: any) {
    this.cadastros.cadastrarEndereco(endereco, this.user.codCliente).subscribe(dados => {
      this.enderecos.push(dados);
      if (!this.enderecoPrincipal) this.enderecoPrincipal = dados;
      this.modalRef?.hide();
    });
  }
}