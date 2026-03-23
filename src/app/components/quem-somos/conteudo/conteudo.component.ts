import { Component, OnInit } from '@angular/core';
import { Contribuidor } from 'src/app/model/contribuidor';


@Component({
    selector: 'app-conteudo',
    templateUrl: './conteudo.component.html',
    styleUrls: ['./conteudo.component.css'],
    standalone: false
})
export class ConteudoComponent implements OnInit {

  contribuidores: Contribuidor[] = [];

  constructor() { 
    this.contribuidores.push(
      new Contribuidor("César Silva", 21, "Tech Leader", "https://i.imgur.com/KeMNrFK.jpg"),
      new Contribuidor("Daniel Rodrigues", 20, "Back-End", "https://i.imgur.com/cq2xQdV.jpg"),
      new Contribuidor("Gabriel Maziero", 31,"Back-End", "https://i.imgur.com/WNovOHo.jpg"),
      new Contribuidor("Michelle Santana", 24, "Front-End", "https://i.imgur.com/iVyDXZL.jpg"),
      new Contribuidor("Vitor Oliveira", 24, "Front-End", "https://i.imgur.com/C3jETn9.jpg" )
    )
  }

 
  ngOnInit(): void {
  }

}
