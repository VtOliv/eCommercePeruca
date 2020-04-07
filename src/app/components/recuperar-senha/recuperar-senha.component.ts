import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  botaoRecuperarClicado = false;
  formRecuperarSenha: FormGroup;
  email: string;
  codigoRedefinicao: string;
  senha: string;

  constructor(private formBuilder: FormBuilder,
    private requisicoes: RequisicoesService,
    private storage: StorageService,
    private route: Router) { }

  ngOnInit(): void {
    this.formRecuperarSenha = this.formBuilder.group({
      email: '',
      codigoRedefinicao: '',
      senha: '',
      confSenha: ''
    })
  }

  enviarCodigo() {
    this.requisicoes.enviarCodigoRedefinicao(this.formRecuperarSenha.value.email).subscribe(dados => {
      if (dados) {
        this.botaoRecuperarClicado = true;
        this.email = this.formRecuperarSenha.value.email;
        this.formRecuperarSenha.controls['email'].disable();
      } else {
        alert("Não foi possivel localizar o endereço de email, verifique o email digitado.")
      }
    }, error => {
      alert("Erro de requisição, tente novamente.")
    })
  }

  alterarSenha() {
    if(this.formRecuperarSenha.value.confSenha == this.formRecuperarSenha.value.senha){
      this.requisicoes.redefinirSenha(this.email,
        this.formRecuperarSenha.value.codigoRedefinicao,
        this.formRecuperarSenha.value.senha)
        .subscribe(
          dados => {
            if (dados != null) {
              alert("Senha modificada com sucesso");
              this.storage.salvarUsuario(dados);
              this.route.navigate(["home"])
            } else {
              return alert("codigo de redefinição de senha invalido");
            }
          }, error => {
            return alert("Erro ao redefinir a senha, tente novamente");
          }
        )
    }else{
      alert("Senhas não iguais, verifique a senha digitada pra prosseguir")
    }
  }
}
