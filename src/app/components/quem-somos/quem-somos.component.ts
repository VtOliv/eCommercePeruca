import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DescricaoComponent } from './descricao/descricao.component';
import { SobreComponent } from './sobre/sobre.component';
import { ConteudoComponent } from './conteudo/conteudo.component';

@Component({
  selector: 'app-quem-somos',
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.css'],
  imports: [HeaderComponent, FooterComponent, DescricaoComponent, SobreComponent, ConteudoComponent],
  standalone: true
})
export class QuemSomosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
