import { Component, OnInit } from '@angular/core';
import { MaisVendidosComponent } from './mais-vendidos/mais-vendidos.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CarroselHomeComponent } from './carrosel-home/carrosel-home.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [MaisVendidosComponent, HeaderComponent, FooterComponent, CarroselHomeComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
