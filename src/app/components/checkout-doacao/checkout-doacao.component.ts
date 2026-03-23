import { Component, ViewChild, ElementRef, AfterViewInit, TemplateRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from "@angular/forms";
import { Locais } from 'src/app/model/locais';
import { DomSanitizer } from '@angular/platform-browser';
import { Validacoes } from 'src/app/model/validacoes';
import { DadosPagamento } from 'src/app/model/dados-pagamento';
import { CadastrosService } from 'src/app/services/cadastros.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-checkout-doacao',
    templateUrl: './checkout-doacao.component.html',
    styleUrls: ['./checkout-doacao.component.css'],
    standalone: true
})
export class CheckoutDoacaoComponent implements AfterViewInit {
  dataAtual: Date = new Date();
  data: string;
  formPagamento: UntypedFormGroup;
  validacoes: Validacoes;
  dadosDePagamento: boolean = false;
  vlDoacao: 49.90;

  private createForm(dadosPagamento: DadosPagamento): UntypedFormGroup {
    return new UntypedFormGroup({
      numeroCartao: new UntypedFormControl(dadosPagamento.numeroCartao),
      mesValidade: new UntypedFormControl(dadosPagamento.mesValidade),
      anoValidade: new UntypedFormControl(dadosPagamento.anoValidade),
      cvv: new UntypedFormControl(dadosPagamento.cvv),
      nomeTitular: new UntypedFormControl(dadosPagamento.nomeTitular),
      cpf: new UntypedFormControl(dadosPagamento.cpf)
    })
  }

  @ViewChild('iframe') iframe: ElementRef;

  locais: Locais[] = [new Locais("Instituto do Câncer SP", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58510.38820676956!2d-46.730180115298296!3d-23.57206121657443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce582a2caf4ef9%3A0x4a60c9bac394fb6b!2sInstituto%20do%20C%C3%A2ncer%20do%20Estado%20de%20S%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1585329515376!5m2!1spt-BR!2sbr"),
  new Locais("AACD", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58499.30397043733!2d-46.68674973666297!3d-23.59692605580908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a1f56f181d9%3A0x87896620d3d38475!2sHospital%20AACD!5e0!3m2!1spt-BR!2sbr!4v1585329134212!5m2!1spt-BR!2sbr"),
  new Locais("GRAAC", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1752128990793!2d-46.64445698554201!3d-23.59804836883202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a25488482bb%3A0xd7abb48c53783ee1!2sGRAACC!5e0!3m2!1spt-BR!2sbr!4v1585167738599!5m2!1spt-BR!2sb")];
  escolhido: number = 0;
  localEscolhido;


  dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  anos = this.anoValidade();
  constructor(sanitizer: DomSanitizer, private fb: UntypedFormBuilder,private cadastros: CadastrosService, private storage: StorageService, private route: Router) {
    this.localEscolhido = this.locais[this.escolhido];
    this.validacoes = new Validacoes();
    this.data = `${this.dataAtual.getFullYear()}-`;
    this.data += this.dataAtual.getMonth() < 9 ? `0${(this.dataAtual.getMonth() + 1)}` : `${(this.dataAtual.getMonth() + 1)}`
    this.formPagamento = this.createForm(new DadosPagamento("", "", "", "", "", ""))

  }

  ngAfterViewInit(): void {
    this.iframe.nativeElement.setAttribute('src', this.localEscolhido.link);
  }

  mudarLocal() {
    this.localEscolhido = this.locais[this.escolhido];
    this.iframe.nativeElement.setAttribute('src', this.localEscolhido.link);
  }

  permitirNumeros(evento: any) {
    this.validacoes.cancelarLetras(evento);
  }

  permitirLetras(evento: any) {
    this.validacoes.cancelarNumeros(evento);
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

  finalizarDoacao(valido) {
    if (valido) {
      this.cadastros.cadastrarDoacao(this.localEscolhido, this.vlDoacao).subscribe(
        dados => {
          if(dados != null){
            let cliente = this.storage.recuperarUsuario();
            if(cliente.doacao == null){
              cliente.doacao = []
            }
            cliente.doacao.push(dados)
            this.storage.salvarUsuario
            this.route.navigate(['/finalizar-compra'])
          }
          console.log(dados)
        }
      )
    } else {
      console.log("erro na requisição")
    }
  }
  
}