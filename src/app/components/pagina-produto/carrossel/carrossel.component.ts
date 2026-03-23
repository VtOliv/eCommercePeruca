import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Imagem } from 'src/app/model/Imagem';
import { RequisicoesService } from '../.././../services/requisicoes.service'

@Component({
    selector: 'app-carrossel',
    templateUrl: './carrossel.component.html',
    styleUrls: ['./carrossel.component.css'],
    standalone: true
})
export class CarrosselComponent implements OnChanges {

  @Input() idProduto;
  imagens: Imagem[];
  primeiraImagem: Imagem = new Imagem("");

  constructor( private requisicoes: RequisicoesService) { 
    
  }

  ngOnChanges(): void {
    this.requisicoes.buscarProduto(this.idProduto).subscribe(
      data => {
        this.imagens = data.imagens;
        this.primeiraImagem = this.imagens[0];
        if(this.imagens.length > 1){
          this.imagens = this.imagens.filter(imagem => imagem != this.primeiraImagem)
        }
      }
    )
  }

}
