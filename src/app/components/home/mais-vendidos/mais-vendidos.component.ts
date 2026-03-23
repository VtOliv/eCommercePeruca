import { Component, OnInit } from '@angular/core';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Produto } from 'src/app/model/produto';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mais-vendidos',
    templateUrl: './mais-vendidos.component.html',
    styleUrls: ['./mais-vendidos.component.css'],
    standalone: false
})
export class MaisVendidosComponent implements OnInit {

  produtosVisiveis: Produto[] = [];
  formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };

  constructor(private requisicoes: RequisicoesService, private route: Router) { 
    this.requisicoes.getProdutosMaisVendidos().subscribe(
      data => this.produtosVisiveis = data
    )
  }

  ngOnInit(): void {
  }

  abrirPaginaProduto(id: number){
    this.route.navigate(['produto/' + id]);
  }

}
