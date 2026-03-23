import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

// Models
import { DadosPagamento } from 'src/app/model/dados-pagamento';
import { Validacoes } from 'src/app/model/validacoes';

@Component({
  selector: 'app-dados-pagamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './dados-pagamento.component.html',
  styleUrls: ['./dados-pagamento.component.css']
})
export class DadosPagamentoComponent implements OnInit, OnChanges {
  // Injeção moderna via inject()
  private fb = inject(FormBuilder);

  @Input() validarDadosPagamento: boolean = false;
  @Output() botaoFinalizarClicado = new EventEmitter<boolean>();

  // Propriedades com inicialização garantida
  public formPagamento!: FormGroup;
  public validacoes = new Validacoes();
  public dataAtual = new Date();
  public data: string = '';
  
  public dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public anos: number[] = [];

  constructor() {
    // Gerar lista de anos no constructor
    this.anos = this.gerarAnosValidade();
    
    // Formatação de data legada mantida, mas inicializada com segurança
    const mes = (this.dataAtual.getMonth() + 1).toString().padStart(2, '0');
    this.data = `${this.dataAtual.getFullYear()}-${mes}`;
  }

  ngOnInit(): void {
    // Inicializa o formulário no ciclo de vida correto
    this.formPagamento = this.createForm(new DadosPagamento("", "", "", "", "", ""));
  }

  private createForm(dados: DadosPagamento): FormGroup {
    return this.fb.group({
      numeroCartao: [dados.numeroCartao, [Validators.required]],
      mesValidade: [dados.mesValidade, [Validators.required]],
      anoValidade: [dados.anoValidade, [Validators.required]],
      cvv: [dados.cvv, [Validators.required]],
      nomeTitular: [dados.nomeTitular, [Validators.required]],
      cpf: [dados.cpf, [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica se a propriedade validarDadosPagamento mudou para true
    if (changes['validarDadosPagamento'] && changes['validarDadosPagamento'].currentValue === true) {
      const isValid = this.validarPagamento();
      this.botaoFinalizarClicado.emit(isValid);
    }
  }

  permitirNumeros(evento: Event): void {
    this.validacoes.cancelarLetras(evento);
  }

  permitirLetras(evento: Event): void {
    this.validacoes.cancelarNumeros(evento);
  }

  validarPagamento(): boolean {
    // Passamos o valor do formulário para a classe de validação customizada
    return this.validacoes.verificarDadosPagamento(this.formPagamento.value);
  }

  private gerarAnosValidade(): number[] {
    const anos: number[] = [];
    const anoAtual = new Date().getFullYear();
    for (let i = 0; i <= 20; i++) {
      anos.push(anoAtual + i);
    }
    return anos;
  }

  verificarValidade(): void {
    const data = new Date();
    const anoSelecionado = Number(this.formPagamento.value.anoValidade);
    const mesSelecionado = Number(this.formPagamento.value.mesValidade);
    const anoAtual = data.getFullYear();
    const mesAtual = data.getMonth() + 1;

    // Se o ano for o atual e o mês for menor ou igual ao atual, força o próximo mês
    if (anoSelecionado === anoAtual && mesSelecionado <= mesAtual && anoSelecionado !== 0) {
      this.formPagamento.patchValue({
        mesValidade: mesAtual + 1
      });
    }
  }
}