import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forma-envio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forma-envio.component.html',
  styleUrls: ['./forma-envio.component.css']
})
export class FormaEnvioComponent implements OnInit {
  
  // Valor inicial 0 corresponde à opção desabilitada
  public formaDeEnvio: number = 0;

  // Tipagem do EventEmitter para number (boa prática no Strict Mode)
  @Output() enviarFormaDeEnvio = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  // Método para gerenciar a mudança e emitir o valor
  public aoMudarEnvio(): void {
    // Garante que o valor emitido seja o selecionado no model
    this.enviarFormaDeEnvio.emit(this.formaDeEnvio);
  }
}