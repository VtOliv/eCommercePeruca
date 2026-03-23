import { Component, OnInit, Input } from '@angular/core';
import { Carrinho } from 'src/app/model/carrinho';
import { RequisicoesService } from 'src/app/services/requisicoes.service';

@Component({
    selector: 'app-detalhes-pedido',
    templateUrl: './detalhes-pedido.component.html',
    styleUrls: ['./detalhes-pedido.component.css'],
    standalone: false
})
export class DetalhesPedidoComponent implements OnInit {

  @Input() pedido;
  produtos: Carrinho[] = [];
  dataEntrega: Date;
  formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
  desconto: number = 0;

  constructor(private requisicoes: RequisicoesService) { }

  ngOnInit(): void {
    this.pedido.itens.forEach(item => {
      this.requisicoes.buscarProduto(item.codProduto).subscribe(produto => {
        this.produtos.push(new Carrinho(produto, item.quantidade));

        if(this.pedido.cupom != null){
          this.desconto += (item.quantidade * produto.valorProduto);
        }
      })
    });

    if (this.pedido.dataEntrega == null) {
      this.dataEntrega = new Date(this.pedido.dtPedido);
      if (this.pedido.vlFrete == 10)
        this.dataEntrega.setDate(this.dataEntrega.getDate() + 15);
      if (this.pedido.vlFrete == 20)
        this.dataEntrega.setDate(this.dataEntrega.getDate() + 7);
      if (this.pedido.vlFrete == 30)
        this.dataEntrega.setDate(this.dataEntrega.getDate() + 3);
    } 

  }

}
