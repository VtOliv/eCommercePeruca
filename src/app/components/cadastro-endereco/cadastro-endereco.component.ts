import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Endereco } from 'src/app/model/endereco';
import { FormGroup, FormControl } from '@angular/forms';
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
  formEndereco: FormGroup;
  estados: Uf[] = [];
  validacoes: Validacoes;

  private createForm(endereco: Endereco): FormGroup {
    return new FormGroup({
      destinatario: new FormControl(endereco.destinatario),
      cep: new FormControl(endereco.cep),
      logradouro: new FormControl(endereco.logradouro),
      numero: new FormControl(endereco.numero),
      bairro: new FormControl(endereco.bairro),
      localidade: new FormControl(endereco.localidade),
      uf: new FormControl(endereco.uf),
      complemento: new FormControl(endereco.complemento)
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
