import { Component, OnInit } from '@angular/core';
import { CarrosselDoacaoComponent } from '../carrossel-doacao/carrossel-doacao.component';

@Component({
    selector: 'app-como-doar',
    templateUrl: './como-doar.component.html',
    styleUrls: ['./como-doar.component.css'],
    standalone: true,
    imports: [CarrosselDoacaoComponent]
})
export class ComoDoarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
