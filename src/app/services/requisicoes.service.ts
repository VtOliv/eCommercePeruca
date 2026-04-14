import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../model/endereco';
import { Uf } from '../model/uf';
import { Produto } from '../model/produto';
import { StorageService } from './storage.service';
import { Login } from '../model/login';
import { Categoria } from '../model/categoria';
import { Cupom } from '../model/cupom';
import { Compra } from '../model/compra';
import { Funcionario } from '../model/funcionario';
import { Cliente } from '../model/cliente';
import { StatusFaleConosco } from '../model/statusFaleConosco';
import { FaleConosco } from '../model/faleConosco';
import { ProdutoApi } from '../model/produto-api';

@Injectable({
  providedIn: 'root'
})
export class RequisicoesService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);

  getEnderecoViaCep(cep: string) {
    return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  getEstados() {
    return this.http.get<Uf[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/`);
  }

  getProdutos() {
    return this.http.get<Produto[]>('http://localhost:8097/ecommerce/buscar-produto');
  }

  getProdutosMaisVendidos() {
    return this.http.get<Produto[]>('http://localhost:8097/ecommerce/buscar-produtos/mais-vendidos');
  }

  public realizarLogin(login: Login) {
    return this.http.post<Cliente>('http://localhost:8097/ecommerce/login-cliente', [login.email, login.senha]);
  }

  public loginFunc(funcionario: Funcionario) {
    return this.http.post<Funcionario>('http://localhost:8097/ecommerce/login-funcionario', [funcionario.matricula, funcionario.senha]);
  }

  public buscarProduto(id: number) {
    return this.http.get<Produto>(`http://localhost:8097/ecommerce/buscar-produto/${id}`);
  }

  public buscarEndereco(id?: number) {
    return this.http.get<Endereco[]>(`http://localhost:8097/ecommerce/enderecos/${id}`);
  }

  public endereco(codigoEndereco: number) {
    return this.http.get<Endereco>(`http://localhost:8097/ecommerce/endereco/${codigoEndereco}`);
  }

  getCategoria() {
    return this.http.get<Categoria[]>('http://localhost:8097/ecommerce/buscar-categorias');
  }

  public todosCupons() {
    return this.http.get<Cupom[]>('http://localhost:8097/ecommerce/buscar-todos-cupons');
  }

  public getCupons() {
    const idCliente = this.storage.recuperarUsuario()?.codCliente ?? 0;
    return this.http.get<Cupom[]>(`http://localhost:8097/ecommerce/filtrar-cupons/${idCliente}`);
  }

  public atualizarCupom(codigoCupom: number, cupom: Cupom) {
    return this.http.patch<Cupom>(`http://localhost:8097/ecommerce/atualizar-cupom/${codigoCupom}`, cupom);
  }

  public getPedidos() {
    const idCliente = this.storage.recuperarUsuario()?.codCliente ?? 0;
    return this.http.get<Compra[]>(`http://localhost:8097/ecommerce/buscar-pedidos/${idCliente}`);
  }

  public cancelarPedido(codigoPedido: number) {
    return this.http.patch<Compra>(`http://localhost:8097/ecommerce/cancelar-pedido/${codigoPedido}`, null);
  }

  public enviarCodigoRedefinicao(email: string) {
    return this.http.patch<unknown>('http://localhost:8097/ecommerce/enviar-codigo/', [email]);
  }

  public redefinirSenha(email: string, codigo: string, senha: string) {
    return this.http.patch<Cliente>('http://localhost:8097/ecommerce/redefinir-senha', [email, codigo, senha]);
  }

  public deletarProduto(produto: Produto) {
    return this.http.delete<Produto>(`http://localhost:8097/ecommerce/deletar-produto/${produto.codProduto}`);
  }

  public produtosRecomendados(codProduto: number) {
    return this.http.get<Produto[]>(`http://localhost:8097/ecommerce/buscar-produtos/recomendados/${codProduto}`);
  }

  public produtosCategoria(codProduto: number) {
    return this.http.get<Produto[]>(`http://localhost:8097/ecommerce/buscar-produtos/categoria/${codProduto}`);
  }

  public statusFL() {
    return this.http.get<StatusFaleConosco[]>('http://localhost:8097/ecommerce/buscar-statusFL/');
  }

  public buscarMensagens() {
    return this.http.get<FaleConosco[]>('http://localhost:8097/ecommerce/buscar-fale-conosco/');
  }

  public alterarProduto(produto: ProdutoApi) {
    return this.http.patch<ProdutoApi>('http://localhost:8097/ecommerce/atualizar-produto/', produto);
  }
}
