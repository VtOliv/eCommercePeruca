import { Component, OnInit, TemplateRef } from '@angular/core';
import { Compra } from 'src/app/model/compra';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Endereco } from 'src/app/model/endereco';
import { Carrinho } from 'src/app/model/carrinho';
import { StorageService } from 'src/app/services/storage.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  pedidos: Compra[] = [];
  formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
  modalRef: BsModalRef;
  cancPedido: Compra;
  enderecoPedido;
  detPedido: Compra;
  carrinho: Carrinho[] = [];

  constructor(private requisicoes: RequisicoesService,
    private modalService: BsModalService,
    private storage: StorageService,
    private route: Router) {
    requisicoes.getPedidos().subscribe(
      dados => {
        this.pedidos = dados;
      },
      error => {
        alert("Erro ao acessar pedidos");
      }
    )
  }

  ngOnInit(): void {
  }

  dataEntrega(pedido: Compra) {
    let dataEntrega = new Date(pedido.dtPedido);
    if (pedido.vlFrete == 10)
      dataEntrega.setDate(dataEntrega.getDate() + 15);
    if (pedido.vlFrete == 20)
      dataEntrega.setDate(dataEntrega.getDate() + 7);
    if (pedido.vlFrete == 30)
      dataEntrega.setDate(dataEntrega.getDate() + 3);
    return dataEntrega;
  }

  abrirModal(template: TemplateRef<any>, pedido: Compra) {
    this.modalRef = this.modalService.show(template)
    this.cancPedido = pedido;
  }

  abrirModalDetalhes(template: TemplateRef<any>, pedido: Compra) {
    this.requisicoes.endereco(pedido.codEndereco).subscribe(
      endereco => this.enderecoPedido = endereco
    )
    this.detPedido = pedido;
    setTimeout(() => { this.modalRef = this.modalService.show(template) }, 500);
  }

  cancelarPedidoFuncao() {
    this.requisicoes.cancelarPedido(this.cancPedido.codPedido).subscribe(
      dados => {
        let posPedido = this.pedidos.indexOf(this.cancPedido);
        this.pedidos[posPedido] = dados;
      }
    );

    this.modalRef.hide();
  }

  refazerPedido(pedido) {
    pedido.itens.forEach(item => {
      this.requisicoes.buscarProduto(item.codProduto).subscribe(produto => {
        this.carrinho.push(new Carrinho(produto, item.quantidade));
        this.storage.salvarCarrinho(this.carrinho);
      })
    });
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.route.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.route.navigated = false;
        window.scrollTo(0, 0);
      }
    });
    this.route.navigate(['/checkout']);
  }
}
