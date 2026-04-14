import { Component, OnInit } from '@angular/core';
import { ComoDoarComponent } from './como-doar/como-doar.component';
import { EscolhaPerucaComponent } from './escolha-peruca/escolha-peruca.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-pagina-institucional',
    templateUrl: './pagina-institucional.component.html',
    styleUrls: ['./pagina-institucional.component.css'],
    standalone: true,
    imports: [ComoDoarComponent, EscolhaPerucaComponent, HeaderComponent, FooterComponent]
})
export class PaginaInstitucionalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
