import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardComponent } from './card/card.component';

@Component({
    selector: 'app-pagina-carrinho',
    templateUrl: './pagina-carrinho.component.html',
    imports: [HeaderComponent, CardComponent],
    styleUrls: ['./pagina-carrinho.component.css'],
    standalone: true
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
