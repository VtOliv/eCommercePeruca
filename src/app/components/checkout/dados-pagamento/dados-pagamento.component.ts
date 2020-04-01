import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, } from '@angular/forms';
import { DadosPagamento } from 'src/app/model/dados-pagamento';
import { Validacoes } from 'src/app/model/validacoes';

@Component({
  selector: 'app-dados-pagamento',
  templateUrl: './dados-pagamento.component.html',
  styleUrls: ['./dados-pagamento.component.css']
})
export class DadosPagamentoComponent implements OnChanges {

  @Output() botaoFinalizarClicado = new EventEmitter();
  @Input() validarDadosPagamento: boolean;

  dataAtual: Date = new Date();
  data: string;
  formPagamento: FormGroup;
  validacoes: Validacoes;

  private createForm(dadosPagamento: DadosPagamento): FormGroup {
    return new FormGroup({
      numeroCartao: new FormControl(dadosPagamento.numeroCartao),
      mesValidade: new FormControl(dadosPagamento.mesValidade),
      anoValidade: new FormControl(dadosPagamento.anoValidade),
      cvv: new FormControl(dadosPagamento.cvv),
      nomeTitular: new FormControl(dadosPagamento.nomeTitular),
      cpf: new FormControl(dadosPagamento.cpf)
    })
  }

  dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  anos = this.anoValidade();
  constructor(private fb: FormBuilder) {
    this.validacoes = new Validacoes();
    this.data = `${this.dataAtual.getFullYear()}-`;
    this.data += this.dataAtual.getMonth() < 9 ? `0${(this.dataAtual.getMonth() + 1)}` : `${(this.dataAtual.getMonth() + 1)}`
    this.formPagamento = this.createForm(new DadosPagamento("", "", "", "", "", ""))
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['validarDadosPagamento'].currentValue) {
      if (this.validarPagamento()) {
        this.botaoFinalizarClicado.emit(true);
      } else {
        this.botaoFinalizarClicado.emit(false);
      }
    }
  }

  permitirNumeros(evento: any) {
    this.validacoes.cancelarLetras(evento);
  }

  permitirLetras(evento: any) {
    this.validacoes.cancelarNumeros(evento)
  }

  validarPagamento(): boolean {
    return this.validacoes.verificarDadosPagamento(this.formPagamento.value);
  }
  anoValidade() {

    let anos: Array<number> = [];
    let anoAtual: Date = new Date();
    for (let i = 0; i <= 20; i++) {
      anos.push(anoAtual.getFullYear() + i);

    } return anos;
  }


  verificarValidade() {
    let data = new Date();
    if (this.formPagamento.value.anoValidade == data.getFullYear() &&
      this.formPagamento.value.mesValidade <= (data.getMonth() + 1) &&
      this.formPagamento.value.anoValidade != "" &&
      this.formPagamento.value.mesValidade != "") {
      this.formPagamento.patchValue({
        mesValidade: data.getMonth() + 2
      })
    }
  }
}
