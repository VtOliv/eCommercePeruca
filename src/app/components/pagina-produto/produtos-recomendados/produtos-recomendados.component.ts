import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Produto } from 'src/app/model/produto';
import { Router } from '@angular/router';

@Component({
    selector: 'app-produtos-recomendados',
    templateUrl: './produtos-recomendados.component.html',
    styleUrls: ['./produtos-recomendados.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProdutosRecomendadosComponent implements OnChanges {
  private requisicoes = inject(RequisicoesService);
  private route = inject(Router);

  @Input({ required: true }) idProduto!: number;
  produtos: Produto[] = [];
  produtosCategoria: Produto[] = [];
  readonly formato: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL'
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['idProduto'] || this.idProduto == null) {
      return;
    }

    this.requisicoes.produtosRecomendados(this.idProduto).subscribe(dados => {
      this.produtos = dados;
    });
    this.requisicoes.produtosCategoria(this.idProduto).subscribe(data => {
      this.produtosCategoria = data;
    });
  }

  abrirPaginaProduto(id: number): void {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.navigate(['produto', id]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  trackByCodProduto = (_: number, produto: Produto): number | string => {
    return produto.codProduto ?? produto.descricao ?? '';
  }
}
