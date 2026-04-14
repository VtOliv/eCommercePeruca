import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';

// Services
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { StorageService } from 'src/app/services/storage.service';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Checkbox
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Injeção de dependências moderna (Angular 21)
  private fb = inject(FormBuilder);
  private requisicoes = inject(RequisicoesService);
  private route = inject(Router);
  private storage = inject(StorageService);

  // Formulário tipado
  formLogin!: FormGroup;

  ngOnInit(): void {
    // 1. Verifica login antes de criar o form
    if (this.storage.recuperarUsuario() != null) {
      this.route.navigate(["home"]);
      return;
    }

    // 2. Inicializa o formulário com validações básicas
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.formLogin.valid) {
      this.requisicoes.realizarLogin(this.formLogin.value).subscribe({
        next: (data) => {
          this.storage.salvarUsuario(data);
          this.route.navigate(["home"]);
        },
        error: (err) => {
          console.error('Erro no login:', err);
          alert("Usuário e/ou senha inválidos");
        }
      });
    } else {
      alert("Campos inválidos. Verifique seu e-mail e senha.");
    }
  }
}