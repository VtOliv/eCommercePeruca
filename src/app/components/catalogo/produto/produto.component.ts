import { Component, OnInit, Output, OnChanges, Input } from '@angular/core';
import { Produto } from 'src/app/model/produto';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.css'],
    standalone: false
})
export class ProdutoComponent implements OnChanges {

  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  @Input() categoria: number;
  @Input() filtro: string;
  formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
  ordenacao = "1";

  constructor(private requisicoes: RequisicoesService,
    private route: Router,
    private routeFiltro: ActivatedRoute) { 
    this.requisicoes.getProdutos().subscribe(
      data => {
        this.produtos = data
        this.produtosFiltrados = this.produtos;

        this.routeFiltro.queryParams.subscribe(parametros => {
          if (parametros["filtro"]) {
            this.filtro = parametros["filtro"];
            this.produtosFiltrados = this.produtos.filter(produto => {
              let descricao = produto.descricao.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z ])/g, '').toLowerCase();
              return descricao.includes(this.filtro) || this.filtro == ""
            })
          }
        })
      }
    )
  }


  ngOnChanges(): void {
    this.produtosFiltrados = this.produtos.filter(
      produto => (produto.categoria.codigo == this.categoria  || this.categoria == 0)
    )
  }

  abrirPaginaProduto(id: number) {
    this.route.navigate(['produto/' + id]);
  }

  ordenarPor(){
    switch(this.ordenacao){
      case "1": this.ordenarPadrao();
        break;
      case "2": this.ordenarMenor();
        break;
      case "3": this.ordenarMaior();
        break;
      case "4": this.ordenarAZ();
        break;
      case "5": this.ordenarZA();
        break;
    }
  }

  ordenarAZ(){
    this.produtosFiltrados.sort((produtoA, produtoB) => {
      if (produtoA.descricao > produtoB.descricao) {
        return 1;
      }
      if (produtoA.descricao < produtoB.descricao) {
        return -1;
      }
      return 0;
    });
  }

  ordenarZA(){
    this.produtosFiltrados.sort((produtoA, produtoB) => {
      if (produtoA.descricao < produtoB.descricao) {
        return 1;
      }
      if (produtoA.descricao > produtoB.descricao) {
        return -1;
      }
      return 0;
    });
  }

  ordenarMaior(){
    this.produtosFiltrados.sort((produtoA, produtoB) => {
      if (produtoA.valorProduto < produtoB.valorProduto) {
        return 1;
      }
      if (produtoA.valorProduto > produtoB.valorProduto) {
        return -1;
      }
      return 0;
    });
  }

  ordenarMenor(){
    this.produtosFiltrados.sort((produtoA, produtoB) => {
      if (produtoA.valorProduto > produtoB.valorProduto) {
        return 1;
      }
      if (produtoA.valorProduto < produtoB.valorProduto) {
        return -1;
      }
      return 0;
    });
  }

  ordenarPadrao(){
    this.produtosFiltrados = this.produtos.filter(
      produto => (produto.categoria.codigo == this.categoria  || this.categoria == 0)
    )
  }
}
