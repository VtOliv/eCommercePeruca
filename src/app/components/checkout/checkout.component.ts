import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Endereco } from 'src/app/model/endereco';
import { Validacoes } from 'src/app/model/validacoes';
import { StorageService } from 'src/app/services/storage.service';
import { Carrinho } from 'src/app/model/carrinho';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { CadastrosService } from 'src/app/services/cadastros.service';
import { Router } from '@angular/router';
import { Cupom } from 'src/app/model/cupom';
import { timeInterval } from 'rxjs/operators';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    standalone: false
})

export class CheckoutComponent implements OnInit {

  modalRef: BsModalRef;
  enderecos = [];
  enderecoPrincipal = null;
  validacoes: Validacoes = new Validacoes();
  formaEnvio: number = 0;
  total: number = 0;
  dadosDePagamento: boolean = false;
  formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
  carrinho: Carrinho[];
  user;
  subTotal: number = 0;
  cupomAtivo: Cupom = null;

  constructor(private requisicoes: RequisicoesService,
              private modalService: BsModalService,
              private storage: StorageService,
              private cadastros: CadastrosService,
              private route: Router) {

    this.atualizar();
    this.requisicoes.buscarEndereco(this.user.codCliente).subscribe(
      dados => {
        this.enderecos = dados

        if (this.enderecos.length > 0) {
          this.enderecoPrincipal = this.enderecos[0];
        }
      }
    );
  }

  atualizar(){
    this.carrinho = this.storage.recuperarCarrinho();
    this.user = this.storage.recuperarUsuario();
    this.total = 0;
    if(this.user != null){
      if (this.carrinho != null && this.carrinho.length != 0) {
        this.carrinho.forEach(item => {
          this.total += (item.produto.valorProduto * item.quantidade);
        });
        this.total += this.formaEnvio;
        this.subTotal = this.total;
      }
    } else {
      alert("Você não esta logado ou não possui cadastro");
      this.route.navigate(["/cadastre-se"]);
    }
      if (this.cupomAtivo != null)
        this.total -= this.subTotal * (this.cupomAtivo.desconto / 100);
  }

  ngOnInit(): void {
    setInterval(() =>{
      this.atualizar();
    }, 10)
  }

  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
  }

  receberFormaDeEnvio(envio) {
    if (envio != this.formaEnvio) {
      this.total -= this.formaEnvio;
      this.formaEnvio = envio;
      this.total += this.formaEnvio;
    }
  }

  receberCupom(cupom) {
    if (cupom != this.cupomAtivo) {
      if (this.cupomAtivo != null)
        this.total += this.subTotal * (this.cupomAtivo.desconto / 100);
      this.cupomAtivo = cupom;
      this.total -= this.subTotal * (this.cupomAtivo.desconto / 100)
    }
  }

  cadastrarEndereco(endereco: Endereco) {
    if (this.validacoes.verificarEndereco(endereco)) {
      alert("Dados não preenchidos corretamente");
    } else {
      this.cadastros.cadastrarEndereco(endereco, this.storage.recuperarUsuario().codCliente).subscribe(
        dados => {
          if (this.enderecos.length == 0) {
            this.enderecoPrincipal = dados;
          }
          this.enderecos.push(dados)
        }
      )
    }
    this.modalRef.hide();
  }

  mudarEndereco(endereco: Endereco) {
    this.enderecoPrincipal = endereco;
    this.modalRef.hide();
  }

  validarCampos(template: TemplateRef<any>) {
    if (this.enderecoPrincipal != null && this.formaEnvio != 0 && this.storage.recuperarCarrinho().length != 0) {
      this.dadosDePagamento = true
    } else {
      this.abrirModal(template)
    }
  }

  finalizarCompra(valido, template: TemplateRef<any>) {
    if (valido) {
      this.cadastros.cadastrarCompra(this.enderecoPrincipal, this.formaEnvio, this.total, this.cupomAtivo).subscribe(
        dados => {
          if (dados != null) {
            let cliente = this.storage.recuperarUsuario();
            if (cliente.pedidos == null) {
              cliente.pedidos = [];
            }
            cliente.pedidos.push(dados);
            this.storage.salvarUsuario(cliente);
            this.storage.removerCarrinho();
            this.route.navigate(['/finalizar-compra'])
          }
        }
      )
    } else {
      this.dadosDePagamento = false;
      this.abrirModal(template);
    }
  }
}