import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Cliente } from 'src/app/model/cliente';
import { Validacoes } from 'src/app/model/validacoes';
import { Router } from "@angular/router";
import { StorageService } from 'src/app/services/storage.service';
import { CadastrosService } from 'src/app/services/cadastros.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formCliente: FormGroup;
  validacoes: Validacoes = new Validacoes();
  segundaSenha: string = "";


  constructor(private formBuilder: FormBuilder, private route: Router, private cadastro: CadastrosService, private storage: StorageService) { }
  ngOnInit() { this.createForm(new Cliente()); }

  createForm(cliente: Cliente) {
    this.formCliente = this.formBuilder.group({
      nome: [cliente.nome],
      cpf: [cliente.cpf],
      telefone: [cliente.telefone],
      email: [cliente.email],
      senha: [cliente.senha],
      segundaSenha: ''
    });

    if (this.storage.recuperarUsuario() != null) {
      this.route.navigate(["home"]);
    }
  }

  onSubmit() {
    if (this.verificarSenhasIguais() && this.validacoes.verificarDadosCliente(this.formCliente.value)) {
      this.cadastro.cadastrarUsuario(this.formCliente.value).subscribe(
        data => {
          if(data == 1){
            alert("Esse email já está vinculado a um cadastro!")
          }else if(data == 2){
            alert("Esse CPF já está vinculado a um cadastro!")
          }else{
            this.storage.salvarUsuario(data);
            this.route.navigate(['home']);
          }
        }
      )
    } else {
      alert("Não foi possivel efetuar o cadastro, verifique os dados e tente novamente.");
    }
  }

  permitirNumeros(evento: any) {
    this.validacoes.cancelarLetras(evento);
  }

  permitirLetras(evento: any) {
    this.validacoes.cancelarNumeros(evento);
  }

  verificarSenhasIguais() {
    if (this.formCliente.value.segundaSenha == this.formCliente.value.senha) {
      return true;
    } else if (this.formCliente.value.senha) {
      alert("Confirme a senha, senhas não coincidem");
    }
    return false;
  }
}




