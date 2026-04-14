import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/model/categoria';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProdutoComponent } from './produto/produto.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-catalogo',
    templateUrl: './catalogo.component.html',
    styleUrls: ['./catalogo.component.css'],
    standalone: true,
    imports: [HeaderComponent, CategoriaComponent, ProdutoComponent, FooterComponent]
})
export class CatalogoComponent implements OnInit {

  categoria: number = 0;

  constructor () { }

  filtrarCategoria(categ: Categoria) {
    this.categoria = categ?.codigo ?? 0;
  }

  ngOnInit() {
  }

}
