import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Categoria } from "src/app/model/categoria";
import { RequisicoesService } from 'src/app/services/requisicoes.service';

@Component({
    selector: 'app-categoria',
    templateUrl: './categoria.component.html',
    styleUrls: ['./categoria.component.css'],
    standalone: false
})
export class CategoriaComponent implements OnInit {
  
  categoriasVisiveis: Categoria[] = [];

  @Output() categClick = new EventEmitter();

  constructor(private requisicoes: RequisicoesService) {
    this.requisicoes.getCategoria().subscribe(
      data => {
        this.categoriasVisiveis = data
        this.categoriasVisiveis.push(new Categoria("todos", 0));
      }
    )
  }

  filtrarProds(c: Categoria) {
    this.categClick.emit(c);
  }

  ngOnInit(): void {
  }

}