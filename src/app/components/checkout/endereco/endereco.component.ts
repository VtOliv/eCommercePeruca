import { Component, Input, OnInit } from '@angular/common';
import { CommonModule } from '@angular/common';
// Importe o módulo de máscara que você está usando (ex: ngx-mask)
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

// Model
import { Endereco } from 'src/app/model/endereco';

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskPipe,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {
  

  @Input({ required: true }) endereco!: Endereco;

  constructor() {}

  ngOnInit(): void {
  }
}