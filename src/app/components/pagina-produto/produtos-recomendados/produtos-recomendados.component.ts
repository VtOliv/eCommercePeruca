import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Produto } from 'src/app/model/produto';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-produtos-recomendados',
    templateUrl: './produtos-recomendados.component.html',
    styleUrls: ['./produtos-recomendados.component.css'],
    standalone: false
})
export class ProdutosRecomendadosComponent implements OnChanges {

  @Input() idProduto;
  produtos: Produto[] = [];
  produtosCategoria: Produto[] = [];
  formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };

  constructor(private requisicoes: RequisicoesService, private route: Router, private Act: ActivatedRoute) { }

  ngOnChanges(): void {
    this.requisicoes.produtosRecomendados(this.idProduto).subscribe(
      dados => {
        this.produtos = dados
      }
    )
    this.requisicoes.produtosCategoria(this.idProduto).subscribe(
      data => this.produtosCategoria = data
    )
  }

  abrirPaginaProduto(id: number){
    this.route.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }

   this.route.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         this.route.navigated = false;
         window.scrollTo(0, 0);
      }
    });

    this.route.navigate(['produto/' + id]);
  }
}
