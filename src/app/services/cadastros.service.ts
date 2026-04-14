import { Injectable, inject } from '@angular/core';
import { Endereco } from '../model/endereco';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../model/cliente';
import { firstValueFrom } from 'rxjs';
import { Compra } from '../model/compra';
import { Item } from '../model/Item';
import { Carrinho } from '../model/carrinho';
import { Cupom } from '../model/cupom';
import { Locais } from '../model/locais';
import { Doacao } from '../model/doacao';
import { FaleConosco } from '../model/faleConosco';
import { ProdutoApi } from '../model/produto-api';
import { Imagem } from '../model/Imagem';

const enderecoBanco = (endereco: Endereco, codCliente: number): object => {
  return {
    destinatario: endereco.destinatario,
    logradouro: endereco.logradouro,
    numero: endereco.numero,
    bairro: endereco.bairro,
    complemento: endereco.complemento,
    cidade: endereco.localidade,
    estado: endereco.uf,
    cep: endereco.cep,
    codCliente
  };
};

@Injectable({
  providedIn: 'root'
})
export class CadastrosService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);

  private readonly imgurUrl = 'https://api.imgur.com/3/image';
  private readonly clientId = 'b8c58d3c3d1dd47';

  public async cadastrarImagem(imageFile: File): Promise<unknown> {
    const formData = new FormData();
    formData.append('image', imageFile, 'teste');

    const headers = new HttpHeaders({
      authorization: `Client-ID ${this.clientId}`
    });

    return firstValueFrom(this.http.post<unknown>(this.imgurUrl, formData, { headers }));
  }

  public cadastrarCompra(
    endereco: Endereco & { codCliente: number; codEndereco: number },
    frete: number,
    total: number,
    cupom: Cupom
  ) {
    const compra = new Compra();
    compra.codCliente = endereco.codCliente;
    compra.codEndereco = endereco.codEndereco;
    compra.dsFormaPagto = 'credito';
    compra.vlFrete = frete;
    compra.vlPedido = total;
    compra.itensPedido = [];
    compra.cupom = cupom;

    const carrinho: Carrinho[] = this.storage.recuperarCarrinho() ?? [];
    carrinho.forEach(peruca => {
      if (!peruca.produto?.codProduto || peruca.quantidade == null) return;
      const item = new Item();
      item.codProduto = peruca.produto.codProduto;
      item.quantidade = peruca.quantidade;
      compra.itensPedido.push(item);
    });

    return this.http.post<unknown>('http://localhost:8097/ecommerce/cadastrar-pedido', compra);
  }

  public cadastrarDoacao(locais: Locais, vlDoacao: number) {
    const doacao = new Doacao();
    doacao.dsFormaPagto = 'credito';
    doacao.vlDoacao = vlDoacao;
    doacao.localDoacao = locais.nome;
    return this.http.post<unknown>('http://localhost:8097/ecommerce/cadastrar-doacao', doacao);
  }

  public cadastrarEndereco(endereco: Endereco, codCliente: number) {
    return this.http.post<unknown>(
      'http://localhost:8097/ecommerce/cadastrar-endereco',
      enderecoBanco(endereco, codCliente)
    );
  }

  public cadastrarUsuario(cliente: Cliente) {
    return this.http.post<unknown>('http://localhost:8097/ecommerce/cadastrar-cliente', cliente);
  }

  public faleConosco(faleConosco: FaleConosco) {
    faleConosco.codCliente = this.storage.recuperarUsuario()?.codCliente;
    return this.http.post<unknown>('http://localhost:8097/ecommerce/cadastrar-fale-conosco', faleConosco);
  }

  public addCupom(cupom: Cupom) {
    return this.http.post<unknown>('http://localhost:8097/ecommerce/cadastrar-cupom', cupom);
  }

  public cadastrarProduto(produto: ProdutoApi, imagens: Imagem[]) {
    produto.imagens = imagens;
    return this.http.post<unknown>('http://localhost:8097/ecommerce/cadastrar-produto', produto);
  }
}
