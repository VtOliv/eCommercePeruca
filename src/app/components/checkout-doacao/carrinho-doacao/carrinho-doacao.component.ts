import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, inject } from '@angular/core';
import { Carrinho } from 'src/app/model/carrinho';
import { Cupom } from 'src/app/model/cupom';
import { StorageService } from 'src/app/services/storage.service';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { CheckoutDoacaoComponent } from '../checkout-doacao.component';
import { Locais } from 'src/app/model/locais';


@Component({
    selector: 'app-carrinho-doacao',
    templateUrl: './carrinho-doacao.component.html',
    styleUrls: ['./carrinho-doacao.component.css'],
    standalone: true
})
export class CarrinhoDoacaoComponent implements OnInit {
  private storage = inject(StorageService);
  private requisicoes = inject(RequisicoesService);


  locais = Locais
  carrinho: Carrinho[] = [];
  subTotal: number = 0;
  cupomAtivo: Cupom = null;
  cupons: Cupom[] = [];
  descontos: number[] = [];
  valorCupom: number = 0;
  formato = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' };
  @Input() frete: number = 0;
  // modalRef: BsModalRef;
  @Output() enviarCupom = new EventEmitter;

  constructor() { 
    this.carrinho = this.storage.recuperarCarrinho();
    if(this.carrinho != null){
      this.carrinho.forEach(item => {
        this.subTotal += item.quantidade * item.produto.valorProduto;
      })
    }else{
      this.carrinho = [];
    }
    
    this.requisicoes.getCupons().subscribe(
      data => {
        this.cupons = data;
      }
    )
  }

  ngOnInit(): void {
  }


}
