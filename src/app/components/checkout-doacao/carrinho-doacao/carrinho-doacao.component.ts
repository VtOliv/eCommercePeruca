import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { Carrinho } from 'src/app/model/carrinho';
import { Cupom } from 'src/app/model/cupom';
import { StorageService } from 'src/app/services/storage.service';
import { RequisicoesService } from 'src/app/services/requisicoes.service';

@Component({
  selector: 'app-carrinho-doacao',
  templateUrl: './carrinho-doacao.component.html',
  styleUrls: ['./carrinho-doacao.component.css'],
  standalone: true
})
export class CarrinhoDoacaoComponent implements OnInit {
  private readonly storage = inject(StorageService);
  private readonly requisicoes = inject(RequisicoesService);

  carrinho: Carrinho[] = [];
  subTotal = 0;
  cupomAtivo: Cupom | null = null;
  cupons: Cupom[] = [];
  descontos: number[] = [];
  valorCupom = 0;
  formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
  @Input() frete = 0;
  @Output() enviarCupom = new EventEmitter<Cupom>();

  ngOnInit(): void {
    this.carrinho = this.storage.recuperarCarrinho() ?? [];
    this.subTotal = this.carrinho.reduce(
      (acc, item) => acc + (item.produto?.valorProduto ?? 0) * (item.quantidade ?? 0), 0
    );

    this.requisicoes.getCupons().subscribe(data => {
      this.cupons = data;
    });
  }
}
