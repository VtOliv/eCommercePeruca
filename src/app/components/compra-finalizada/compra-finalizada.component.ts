import { Component, OnInit } from '@angular/core';
import { CentroComponent } from './centro/centro.component';
import { FooterComponent } from './../footer/footer.component';

@Component({
    selector: 'app-compra-finalizada',
    templateUrl: './compra-finalizada.component.html',
    imports: [CentroComponent, FooterComponent],
    styleUrls: ['./compra-finalizada.component.css'],
    standalone: true
})
export class CompraFinalizadaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
