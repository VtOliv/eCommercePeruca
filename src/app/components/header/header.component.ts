import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, UntypedFormGroup, UntypedFormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RequisicoesService } from "../../services/requisicoes.service";
import { StorageService } from "../../services/storage.service";
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges {

  formLogin: UntypedFormGroup;
  email: string;
  senha: string;
  nome: string;
  sexo: string;
  logado: boolean;
  quantidade: number;
  filtro: string = "";
  @Input() atualizarQuantidade: boolean;
  @Output() atualizarCarrinho: EventEmitter<any> = new EventEmitter();

  constructor(private requisicoes: RequisicoesService, private route: Router, private storage: StorageService) {
    this.formLogin = this.createForm(new Login("", ""));
    this.verificar();
    if (this.storage.recuperarCarrinho() != null) {
      this.quantidade = this.storage.recuperarCarrinho().length;
    } else {
      this.quantidade = 0;
    }
  }

  private createForm(login: Login): UntypedFormGroup {
    return new UntypedFormGroup({
      email: new UntypedFormControl(login.email),
      senha: new UntypedFormControl(login.senha)
    })
  }

  ngOnChanges(): void {
    if (this.atualizarQuantidade) {
      this.quantidade = this.storage.recuperarCarrinho().length;

      setTimeout(() => {
        this.atualizarCarrinho.emit();
      })
    }

    this.verificar();
  }

  verificar() {
    if (this.storage.recuperarUsuario() == null) {
      this.logado = false;
      this.nome = "";
    } else {
      this.logado = true;
      this.nome = this.storage.nomeCliente();
      this.sexo = this.storage.sexoCliente();
    }
  }

  login() {
    if (this.formLogin.value.email != "" && this.formLogin.value.senha != "") {
      this.requisicoes.realizarLogin(this.formLogin.value).subscribe(
        data => {
          if (data != null) {
            this.storage.salvarUsuario(data);
            this.verificar();
            alert("Login efetuado com sucesso")
            this.formLogin.reset();
            this.formLogin.value.senha = "";
          } else {
            alert("Usuario e/ou senha inválidos");
          }
        }, error => {
          alert("Usuario e/ou senha inválidos");
        }
      )
    } else {
      alert("Campos invalidos, verifique os campos e tente novamente");
    }
  }

  deslogarCliente() {
    this.storage.removerUsuario();
    this.storage.removerCarrinho();
    this.logado = false;
    this.route.navigate(['/login']);
  }


  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  buscar() {
    this.filtro = this.filtro.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z ])/g, '').toLowerCase()
    this.route.navigate(["/catalogo"], { queryParams: { filtro: this.filtro } });
  }
}
