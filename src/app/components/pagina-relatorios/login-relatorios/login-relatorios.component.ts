import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, FormGroup } from "@angular/forms";
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-login-relatorios',
    templateUrl: './login-relatorios.component.html',
    styleUrls: ['./login-relatorios.component.css'],
    standalone: true
})
export class LoginRelatoriosComponent implements OnInit {
  private formBuilder = inject(UntypedFormBuilder);
  private requisicoes = inject(RequisicoesService);
  private route = inject(Router);
  private storage = inject(StorageService);


  formFunc;
  matricula: string;
  senha: string;

  ngOnInit(): void {
    this.formFunc = this.formBuilder.group({
      matricula: [this.matricula],
      senha: [this.senha]
    });

    if (this.storage.recuperarFuncionario() != null) {
      this.route.navigate(["pg-relatorios"]);
    }
  }

  login() {
    if (true) {
      this.requisicoes.loginFunc(this.formFunc.value).subscribe(
        funcionario => {
          if (funcionario != null) {
            this.storage.salvarFunc(funcionario);
            this.route.navigate(["pg-relatorios"])
            alert("Login correto");
          }
          
        }, error => {
          alert("Funcionario nao cadastro!");
        }
      )
    } else {
      alert("Campos invalidos");
    }
  }
}
