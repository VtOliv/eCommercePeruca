import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Services & Models
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { StorageService } from 'src/app/services/storage.service';
import { Validacoes } from 'src/app/model/validacoes';
import { Funcionario } from 'src/app/model/funcionario';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  // Injeções modernas via inject()
  private fb = inject(FormBuilder);
  private requisicoes = inject(RequisicoesService);
  private storage = inject(StorageService);
  private route = inject(Router);

  // Propriedades tipadas
  public formFunc!: FormGroup;
  public validacoes = new Validacoes();

  ngOnInit(): void {
    // Verifica se já está logado antes de inicializar o formulário
    if (this.storage.recuperarFuncionario()) {
      this.route.navigate(["pg-relatorios"]);
      return;
    }

    this.initForm();
  }

  private initForm(): void {
    this.formFunc = this.fb.group({
      matricula: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      senha: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    });
  }

  public permitirNumerosFunc(evento: Event): void {
    this.validacoes.cancelarLetras(evento);
  }

  public entrar(): void {
    if (this.formFunc.valid) {
      this.requisicoes.loginFunc(this.formFunc.value).subscribe({
        next: (funcionario) => {
          if (funcionario) {
            this.storage.salvarFunc(funcionario);
            this.formFunc.reset();
            alert("Login correto");
            this.route.navigate(["pg-relatorios"]);
          } else {
            alert("Funcionário não cadastrado ou dados incorretos!");
          }
        },
        error: (err) => {
          console.error('Erro no login:', err);
          alert("Erro na conexão com o servidor.");
        }
      });
    } else {
      alert("Preencha a matrícula e a senha corretamente.");
    }
  }
}