import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from "@angular/forms";
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true
})

export class LoginComponent implements OnInit {


  formLogin;
  email: string;
  senha: string;

  constructor(private fb: UntypedFormBuilder,
    private requisicoes: RequisicoesService,
    private route: Router,
    private storage: StorageService) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [this.email],
      senha: [this.senha]
    });

    if (this.storage.recuperarUsuario() != null) {
      this.route.navigate(["home"]);
    }
  }

  login() {
    if (this.formLogin.status != "INVALID") {
      this.requisicoes.realizarLogin(this.formLogin.value).subscribe(
        data => {
          this.storage.salvarUsuario(data);
          this.route.navigate(["home"])
        },
        error => {
          alert("Usuario e/ou senha inválidos");
        }
      )
    } else {
      alert("Campos invalidos, verifique os campos e tente novamente");
    }
  }
}