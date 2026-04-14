import { Component, OnInit } from '@angular/core';
import { CentroComponent } from "./centro/centro.component";

@Component({
    selector: 'app-finalizar',
    templateUrl: './finalizar.component.html',
    imports: [CentroComponent],
    styleUrls: ['./finalizar.component.css'],
    standalone: true
})
export class FinalizarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
