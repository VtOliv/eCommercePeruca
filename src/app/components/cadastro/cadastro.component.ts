import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

// Models e Services
import { Cliente } from '../../model/cliente';
import { Validacoes } from '../../model/validacoes';
import { StorageService } from '../../services/storage.service';
import { CadastrosService } from '../../services/cadastros.service';

@Component({
    selector: 'app-cadastro',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formCliente!: FormGroup;
  validacoes: Validacoes = new Validacoes();

  private fb = inject(FormBuilder);
  private route = inject(Router);
  private cadastro = inject(CadastrosService);
  private storage = inject(StorageService);

  ngOnInit(): void {
    if (this.storage.recuperarUsuario() != null) {
      this.route.navigate(["home"]);
      return;
    }

    this.createForm(new Cliente("", "", "", "", "", "", 0), "");
  }

  createForm(cliente: Cliente, segundaSenha: string) {
    this.formCliente = this.fb.group({
      nome: [cliente.nome],
      sexo: [cliente.sexo],
      cpf: [cliente.cpf],
      telefone: [cliente.telefone],
      email: [cliente.email],
      senha: [cliente.senha],
      segundaSenha: [segundaSenha]
    });
  }

  onSubmit() {
    const dadosForm = this.formCliente.value;

    if (this.verificarSenhasIguais() && this.validacoes.verificarDadosCliente(dadosForm)) {
      this.cadastro.cadastrarUsuario(dadosForm).subscribe({
        next: (data) => {
          if (data === 1) {
            alert("Esse email já está vinculado a um cadastro!");
          } else if (data === 2) {
            alert("Esse CPF já está vinculado a um cadastro!");
          } else {
            this.storage.salvarUsuario(data as Cliente);
            this.route.navigate(['home']);
          }
        },
        error: (err) => {
          console.error("Erro ao cadastrar:", err);
          alert("Ocorreu um erro no servidor. Tente novamente mais tarde.");
        }
      });
    } else {
      alert("Não foi possível efetuar o cadastro. Verifique os dados e as senhas.");
    }
  }

  permitirNumeros(evento: Event) {
    this.validacoes.cancelarLetras(evento);
  }

  permitirLetras(evento: Event) {
    this.validacoes.cancelarNumeros(evento);
  }

  verificarSenhasIguais(): boolean {
    const { senha, segundaSenha } = this.formCliente.value;
    if (senha === segundaSenha && senha !== "") {
      return true;
    }
    alert("As senhas não coincidem!");
    return false;
  }
}