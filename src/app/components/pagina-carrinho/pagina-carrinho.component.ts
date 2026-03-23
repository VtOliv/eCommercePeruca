import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pagina-carrinho',
    templateUrl: './pagina-carrinho.component.html',
    styleUrls: ['./pagina-carrinho.component.css'],
    standalone: false
})
export class PaginaCarrinhoComponent implements OnInit {

  atualizarCarrinho: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  atualizar(){
    this.atualizarCarrinho = !this.atualizarCarrinho;
  }

}
