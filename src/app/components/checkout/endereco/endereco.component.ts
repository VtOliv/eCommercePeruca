import { Component, OnInit, Input, TemplateRef, Output } from '@angular/core';
import { Endereco } from 'src/app/model/endereco';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/public_api';
import { EventEmitter } from 'protractor';

@Component({
    selector: 'app-endereco',
    templateUrl: './endereco.component.html',
    styleUrls: ['./endereco.component.css'],
    standalone: false
})
export class EnderecoComponent implements OnInit {

  @Input() endereco;

  constructor() {
  }

  ngOnInit(): void {
  }

}
