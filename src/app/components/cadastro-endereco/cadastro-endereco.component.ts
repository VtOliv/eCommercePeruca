import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Endereco } from 'src/app/model/endereco';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Uf } from 'src/app/model/uf';
import { Validacoes } from 'src/app/model/validacoes';

@Component({
  selector: 'app-cadastro-endereco',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.css']
})
export class CadastroEnderecoComponent implements OnInit {

  @Output() novoEndereco = new EventEmitter();
  formEndereco: UntypedFormGroup;
  estados: Uf[] = [];
  validacoes: Validacoes;

  private createForm(endereco: Endereco): UntypedFormGroup {
    return new UntypedFormGroup({
      destinatario: new UntypedFormControl(endereco.destinatario),
      cep: new UntypedFormControl(endereco.cep),
      logradouro: new UntypedFormControl(endereco.logradouro),
      numero: new UntypedFormControl(endereco.numero),
      bairro: new UntypedFormControl(endereco.bairro),
      localidade: new UntypedFormControl(endereco.localidade),
      uf: new UntypedFormControl(endereco.uf),
      complemento: new UntypedFormControl(endereco.complemento)
    })
  }

  constructor(private http: RequisicoesService) {
    this.formEndereco = this.createForm(new Endereco("", "", null, "", "", "", ""));
    this.http.getEstados().subscribe(dados => {
      this.estados = dados;
    });
    this.validacoes = new Validacoes();
  }

  validarCep(evento: any) {
    this.validacoes.cancelarLetras(evento)
  }

  permitirLetras(evento: any) {
    this.validacoes.cancelarNumeros(evento)
  }

  preencherEndereco() {
    if (this.formEndereco.value.cep.length == 8) {
      this.http.getEnderecoViaCep(this.formEndereco.value.cep).subscribe(
        dados => {
          this.formEndereco.patchValue({
            localidade: dados.localidade,
            bairro: dados.bairro,
            uf: dados.uf,
            logradouro: dados.logradouro
          })
        }
      )
    }
  }

  ngOnInit(): void {
  }

}
