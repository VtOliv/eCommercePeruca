import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recuperar-senha',
    templateUrl: './recuperar-senha.component.html',
    styleUrls: ['./recuperar-senha.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule]
})
export class RecuperarSenhaComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private requisicoes = inject(RequisicoesService);
  private storage = inject(StorageService);
  private route = inject(Router);

  botaoRecuperarClicado = false;
  formRecuperarSenha!: FormGroup;
  private email = '';

  ngOnInit(): void {
    this.formRecuperarSenha = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      codigoRedefinicao: ['', [Validators.minLength(8), Validators.maxLength(8)]],
      senha: ['', Validators.minLength(8)],
      confSenha: ['', Validators.minLength(8)]
    });
  }

  enviarCodigo(): void {
    const emailValue: string = this.formRecuperarSenha.value.email;
    this.requisicoes.enviarCodigoRedefinicao(emailValue).subscribe({
      next: dados => {
        if (dados) {
          this.botaoRecuperarClicado = true;
          this.email = emailValue;
          this.formRecuperarSenha.controls['email'].disable();
        } else {
          alert('Não foi possível localizar o endereço de email, verifique o email digitado.');
        }
      },
      error: () => {
        alert('Erro de requisição, tente novamente.');
      }
    });
  }

  alterarSenha(): void {
    const { senha, confSenha, codigoRedefinicao } = this.formRecuperarSenha.value;
    if (confSenha !== senha) {
      alert('Senhas não iguais, verifique a senha digitada para prosseguir.');
      return;
    }
    this.requisicoes.redefinirSenha(this.email, codigoRedefinicao, senha).subscribe({
      next: dados => {
        if (dados != null) {
          alert('Senha modificada com sucesso');
          this.storage.salvarUsuario(dados);
          this.route.navigate(['home']);
        } else {
          alert('Código de redefinição de senha inválido.');
        }
      },
      error: () => {
        alert('Erro ao redefinir a senha, tente novamente.');
      }
    });
  }
}
