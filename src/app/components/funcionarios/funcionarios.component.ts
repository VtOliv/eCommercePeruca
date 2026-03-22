import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Validacoes } from 'src/app/model/validacoes';
import { Funcionario } from 'src/app/model/funcionario';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  formFunc: UntypedFormGroup;
  validacoes: Validacoes = new Validacoes();
  matricula: string;
  senha: string;

  constructor(private route: Router, private formBuilder: UntypedFormBuilder, private requisicoes: RequisicoesService, private storage: StorageService) { }


  ngOnInit(): void {
    this.createForm(new Funcionario());

    if (this.storage.recuperarFuncionario() != null) {
      this.route.navigate(["pg-relatorios"]);
    }
  }
  createForm(funcionario: Funcionario) {
    this.formFunc = this.formBuilder.group({
      matricula: [this.matricula],
      senha: [this.senha]
    })
  }

  permitirLetrasFunc(evento: any) {
    this.validacoes.cancelarNumeros(evento);
  }
  permitirNumerosFunc(evento: any) {
    this.validacoes.cancelarLetras(evento);
  }

  entrar() {
    this.requisicoes.loginFunc(this.formFunc.value).subscribe(
      funcionario => {
        if (funcionario != null) {
          this.storage.salvarFunc(funcionario);
          this.formFunc.reset();
          this.route.navigate(["pg-relatorios"])
          alert("Login correto");
        } else {
          alert("Funcionario nao cadastro!");
        }
      }
    )
  }
  
}
