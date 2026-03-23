import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-forma-envio',
    templateUrl: './forma-envio.component.html',
    styleUrls: ['./forma-envio.component.css'],
    standalone: false
})
export class FormaEnvioComponent implements OnInit {

  formaDeEnvio: number = 0;
  @Output() enviarFormaDeEnvio = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

}
