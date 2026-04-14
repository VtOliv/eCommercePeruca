import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';

@Component({
    selector: 'app-historico-pedidos',
    templateUrl: './historico-pedidos.component.html',
    styleUrls: ['./historico-pedidos.component.css'],
    standalone: true,
    imports: [ListaPedidosComponent, HeaderComponent, FooterComponent]
})
export class HistoricoPedidosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
