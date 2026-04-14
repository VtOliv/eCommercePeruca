import { Injectable } from '@angular/core';
import { Carrinho } from '../model/carrinho';
import { Produto } from '../model/produto';
import { Cliente } from '../model/cliente';
import { Funcionario } from '../model/funcionario';
import { ProdutoApi } from '../model/produto-api';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  salvarCarrinho(carrinho: Carrinho[]): void {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  recuperarCarrinho(): Carrinho[] | null {
    const raw = localStorage.getItem('carrinho');
    return raw ? JSON.parse(raw) : null;
  }

  salvarUsuario(cliente: Cliente) {
    localStorage.setItem('cliente', btoa(JSON.stringify(cliente)));
  }

  salvarFunc(funcionario: Funcionario) {
    localStorage.setItem('funcionario', btoa(JSON.stringify(funcionario)));
  }

  nomeCliente(): string {
    const cliente = this.recuperarUsuario();
    return cliente?.nome ?? '';
  }

  sexoCliente(): string {
    const cliente = this.recuperarUsuario();
    return cliente?.sexo ?? '';
  }
  recuperarUsuario(): Cliente | null {
    const raw = localStorage.getItem('cliente');
    if (raw == null) return null;
    return JSON.parse(atob(raw));
  }

  recuperarFuncionario(): Funcionario | null {
    const raw = localStorage.getItem('funcionario');
    if (raw == null) return null;
    return JSON.parse(atob(raw));
  }

  removerFuncionario() {
    localStorage.removeItem('funcionario');
  }

  removerUsuario() {
    localStorage.removeItem('cliente');
  }

  removerCarrinho() {
    localStorage.removeItem('carrinho');
  }
 
}
