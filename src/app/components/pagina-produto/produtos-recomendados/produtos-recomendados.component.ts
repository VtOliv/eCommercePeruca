import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Produto } from 'src/app/model/produto';

@Component({
  selector: 'app-produtos-recomendados',
  templateUrl: './produtos-recomendados.component.html',
  styleUrls: ['./produtos-recomendados.component.css']
})
export class ProdutosRecomendadosComponent implements OnChanges {

  @Input() idProduto;
  produtos: Produto[] = [];
  produtosCategoria: Produto[] = [];
  formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };

  constructor(private requisicoes: RequisicoesService) { }

  ngOnChanges(): void {
    this.requisicoes.produtosRecomendados(this.idProduto).subscribe(
      dados => {
        this.produtos = dados
        this.requisicoes.produtosCategoria(this.idProduto, this.produtos[0].categoria.codigo).subscribe(
          data => this.produtosCategoria = data
        )
      }
    )
  }

}
