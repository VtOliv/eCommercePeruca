import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-pagina-produto',
    templateUrl: './pagina-produto.component.html',
    styleUrls: ['./pagina-produto.component.css'],
    standalone: true
})
export class PaginaProdutoComponent implements OnInit {

  id;
  atualizarCarrinho = false;

  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  atualizar(){
    if(this.atualizarCarrinho){
      this.atualizarCarrinho = false;
    }else{
      this.atualizarCarrinho = true;
    }
  }
}
