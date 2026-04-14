import { Component, OnChanges, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

// Services & Models
import { RequisicoesService } from "../../services/requisicoes.service";
import { StorageService } from "../../services/storage.service";
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  private requisicoes = inject(RequisicoesService);
  private route = inject(Router);
  private storage = inject(StorageService);
  private fb = inject(FormBuilder);

  // Propriedades de Estado
  public formLogin!: FormGroup;
  public logado = false;
  public nome: string = "";
  public sexo: string = "";
  public quantidade: number = 0;
  public filtro: string = "";
  public isSidebarOpen = false; // Controle do menu lateral

  @Input() atualizarQuantidade: boolean = false;
  @Output() atualizarCarrinho = new EventEmitter<void>();

  ngOnInit(): void {
    this.initForm();
    this.verificarUsuario();
    this.atualizarStatusCarrinho();
  }

  ngOnChanges(): void {
    if (this.atualizarQuantidade) {
      this.atualizarStatusCarrinho();
      // Emitir evento para o pai após a atualização
      setTimeout(() => this.atualizarCarrinho.emit());
    }
    this.verificarUsuario();
  }

  private initForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  public verificarUsuario(): void {
    const usuario = this.storage.recuperarUsuario();
    if (usuario) {
      this.logado = true;
      this.nome = this.storage.nomeCliente();
      this.sexo = this.storage.sexoCliente();
    } else {
      this.logado = false;
      this.nome = "";
    }
  }

  public atualizarStatusCarrinho(): void {
    const carrinho = this.storage.recuperarCarrinho();
    this.quantidade = carrinho ? carrinho.length : 0;
  }

  public login(): void {
    if (this.formLogin.valid) {
      this.requisicoes.realizarLogin(this.formLogin.value).subscribe({
        next: (data) => {
          if (data) {
            this.storage.salvarUsuario(data);
            this.verificarUsuario();
            alert("Login efetuado com sucesso");
            this.formLogin.reset();
          } else {
            alert("Usuário e/ou senha inválidos");
          }
        },
        error: () => alert("Erro ao realizar login. Tente novamente.")
      });
    } else {
      alert("Preencha os campos corretamente.");
    }
  }

  public deslogarCliente(): void {
    this.storage.removerUsuario();
    this.storage.removerCarrinho();
    this.logado = false;
    this.atualizarStatusCarrinho();
    this.route.navigate(['/home']);
  }

  // Controle de Sidebar via Angular (sem mexer no document)
  public toggleNav(state: boolean): void {
    this.isSidebarOpen = state;
  }

  public buscar(): void {
    if (!this.filtro.trim()) return;
    
    const filtroLimpo = this.filtro
      .normalize('NFD')
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z ])/g, '')
      .toLowerCase();
      
    this.route.navigate(["/catalogo"], { queryParams: { filtro: filtroLimpo } });
  }
}