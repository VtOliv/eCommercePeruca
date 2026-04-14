import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { Produto } from 'src/app/model/produto';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Carrinho } from 'src/app/model/carrinho';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-comprar',
    templateUrl: './comprar.component.html',
    styleUrls: ['./comprar.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComprarComponent implements OnChanges {
  private requisicoes = inject(RequisicoesService);
  private storage = inject(StorageService);

  @Input({ required: true }) idProduto!: number;
  produto: Produto | null = null;
  carrinho: Carrinho[] = [];
  compra: Carrinho = new Carrinho();
  @Output() atualizarCarrinho: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['idProduto'] || this.idProduto == null) {
      return;
    }

    this.requisicoes.buscarProduto(this.idProduto).subscribe(dados => {
      this.produto = dados;
    });
  }

  adicionarNoCarrinho(qtd: number | string): void {
    if (!this.produto) {
      return;
    }

    this.carrinho = this.storage.recuperarCarrinho() ?? [];
    this.compra.produto = this.produto;
    this.compra.quantidade = Number(qtd);
    this.carrinho = this.carrinho.filter(
      item => item.produto?.codProduto !== this.produto?.codProduto
    );
    this.carrinho.push(this.compra);

    this.storage.salvarCarrinho(this.carrinho);
    this.atualizarCarrinho.emit();
    alert('Item adicionado no carrinho');
  }
}
