import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-progresso-pedido',
    templateUrl: './progresso-pedido.component.html',
    styleUrls: ['./progresso-pedido.component.css'],
    standalone: false
})
export class ProgressoPedidoComponent implements OnInit {

  @Input() status;
  statusPedido: boolean[] = [false, false, false, false];

  constructor() { }

  ngOnInit(): void {
    switch(this.status.cod_status){
      case 1: 
        this.statusPedido[0] = true;
      break;
      case 2:
        this.statusPedido[0] = true;
        this.statusPedido[1] = true;
      break;
      case 4:
        this.statusPedido[0] = true;
        this.statusPedido[1] = true;
        this.statusPedido[2] = true;
      break;
      case 5:
        this.statusPedido[0] = true;
        this.statusPedido[1] = true;
        this.statusPedido[2] = true;
        this.statusPedido[3] = true;
      break;
    }
  }
  

}
