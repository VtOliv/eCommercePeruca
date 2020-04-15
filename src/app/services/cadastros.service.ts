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
import { ProdutoApi } from '../model/produto-api';
import { Imagem } from '../model/Imagem';

const storage: StorageService = new StorageService();

const enderecoBanco = (endereco, codCliente) =>{
  return {
    "destinatario": endereco.destinatario,
    "logradouro": endereco.logradouro,
    "numero": endereco.numero,
    "bairro": endereco.bairro,
    "complemento": endereco.complemento,
    "cidade": endereco.localidade,
    "estado": endereco.uf,
    "cep": endereco.cep,
    "codCliente":codCliente
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

  public cadastrarImagem(imageFile){
    let formData = new FormData();
    formData.append('image', imageFile, "teste");
 
    let header = new HttpHeaders({
      "authorization": 'Client-ID '+this.clientId
    });
   
    return this.http.post<any>(this.url, formData, {headers:header}).pipe(
      map(
        data => data
      )
    );
  }

  public cadastrarCompra(endereco, frete: number, total: number, cupom: Cupom){
    let compra: Compra = new Compra();
    compra.codCliente = endereco.codCliente;
    compra.codEndereco = endereco.codEndereco;
    compra.dsFormaPagto = "credito";
    compra.vlFrete = frete;
    compra.vlPedido = total;
    compra.itensPedido = [];
    compra.cupom = cupom;
    let carrinho: Carrinho [] = storage.recuperarCarrinho();
    carrinho.forEach(peruca => {
      let item: Item = new Item();
      item.codProduto = peruca.produto.codProduto;
      item.quantidade = peruca.quantidade;
      compra.itensPedido.push(item);
    })

    let url = this.http.post<any>("http://localhost:8080/ecommerce/cadastrar-pedido", compra);
    return url.pipe(map(
      dados => dados
    ))
  }

  public cadastrarEndereco(endereco: Endereco, codCliente){
    let url = this.http.post("http://localhost:8080/ecommerce/cadastrar-endereco", enderecoBanco(endereco, codCliente));
    return url.pipe(map(
      dados => dados
    ))
  }

  public cadastrarUsuario(cliente: Cliente){
    let url = this.http.post<any>("http://localhost:8080/ecommerce/cadastrar-cliente", cliente);
    return url.pipe(map(
      dados => dados
    ));
  }
  public cadastrarProduto(produto: ProdutoApi, imagens: File[]){
    produto.imagens = [];
    produto.imagens.push(new Imagem("../Users/DRAraujo/Desktop/eCommercePeruca/src/assets/images/000 - frente"))
    let url = this.http.post<any>("http://localhost:8080/ecommerce/cadastrar-produto", produto);
    return url.pipe(map(
      dados => dados
    ));
  }
}
