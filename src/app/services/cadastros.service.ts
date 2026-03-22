import { Injectable } from '@angular/core';
import { Endereco } from '../model/endereco';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cliente } from '../model/cliente';
import { map } from "rxjs/operators";
import { Compra } from '../model/compra';
import { Item } from '../model/Item';
import { Carrinho } from '../model/carrinho';
import { Cupom } from '../model/cupom';
import { Locais } from '../model/locais';
import { Doacao } from '../model/doacao';
import { FaleConosco } from '../model/faleConosco';
import { ProdutoApi } from '../model/produto-api';
import { Imagem } from '../model/Imagem';

const storage: StorageService = new StorageService();

const enderecoBanco = (endereco, codCliente) => {
  return {
    "destinatario": endereco.destinatario,
    "logradouro": endereco.logradouro,
    "numero": endereco.numero,
    "bairro": endereco.bairro,
    "complemento": endereco.complemento,
    "cidade": endereco.localidade,
    "estado": endereco.uf,
    "cep": endereco.cep,
    "codCliente": codCliente
  }
}

@Injectable({
  providedIn: 'root'
})


export class CadastrosService {
  private images:object[] = [];
  private url: string = 'https://api.imgur.com/3/image';
  private clientId: string = 'b8c58d3c3d1dd47';
  imageLink:any;

  constructor(private http: HttpClient) { }

  public async cadastrarImagem(imageFile): Promise<any>{
    let formData = new FormData();
    let teste;
    formData.append('image', imageFile, "teste");
 
    let header = new HttpHeaders({
      "authorization": 'Client-ID '+this.clientId
    });
   
    await this.http.post<any>(this.url, formData, {headers:header}).toPromise().then(
      data => teste = data
    )

    return teste;
  }

  public cadastrarCompra(endereco, frete: number, total: number, cupom: Cupom) {
    let compra: Compra = new Compra();
    compra.codCliente = endereco.codCliente;
    compra.codEndereco = endereco.codEndereco;
    compra.dsFormaPagto = "credito";
    compra.vlFrete = frete;
    compra.vlPedido = total;
    compra.itensPedido = [];
    compra.cupom = cupom;
    let carrinho: Carrinho[] = storage.recuperarCarrinho();
    carrinho.forEach(peruca => {
      let item: Item = new Item();
      item.codProduto = peruca.produto.codProduto;
      item.quantidade = peruca.quantidade;
      compra.itensPedido.push(item);
    })

    let url = this.http.post<any>("http://localhost:8097/ecommerce/cadastrar-pedido", compra);
    return url.pipe(map(
      dados => dados
    ))
  }

  public cadastrarDoacao(locais: Locais, vlDoacao: number){
    let doacao: Doacao = new Doacao()
    console.log(locais, vlDoacao, storage.recuperarCarrinho(), storage.recuperarUsuario())
    doacao.dsFormaPagto = "credito";
    doacao.vlDoacao = 49,90;
    doacao.localDoacao = "local Escolhido"
    let url = this.http.post<any>("http://localhost:8097/ecommerce/cadastrar-doacao", doacao);
    return url.pipe(map(
      dados => dados
    ))
  }

  public cadastrarEndereco(endereco: Endereco, codCliente){
    let url = this.http.post("http://localhost:8097/ecommerce/cadastrar-endereco", enderecoBanco(endereco, codCliente));
    return url.pipe(map(
      dados => dados
    ))
  }

  public cadastrarUsuario(cliente: Cliente) {
    let url = this.http.post<any>("http://localhost:8097/ecommerce/cadastrar-cliente", cliente);
    return url.pipe(map(
      dados => dados
    ));
  }
  public faleConosco(faleConosco: FaleConosco) {
    faleConosco.codCliente = storage.recuperarUsuario().codCliente
    let url = this.http.post<any>("http://localhost:8097/ecommerce/cadastrar-fale-conosco", faleConosco);
    return url.pipe(map(
      dados => dados
    ));
  }

  public addCupom(cupom: Cupom) {
    let url = this.http.post<any>("http://localhost:8097/ecommerce/cadastrar-cupom", cupom);
    return url.pipe(
      map(
        dados => dados
      )
    );
  }

  public cadastrarProduto(produto: ProdutoApi, imagens: Imagem[]){
    produto.imagens = imagens
    console.log(produto);
    let url = this.http.post<any>("http://localhost:8097/ecommerce/cadastrar-produto", produto);
    return url.pipe(map(
      dados => dados
    ));
  }
}
