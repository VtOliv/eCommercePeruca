import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Validacoes } from 'src/app/model/validacoes';
import { Produto } from 'src/app/model/produto';
import { Categoria } from 'src/app/model/categoria';
import { CadastrosService } from 'src/app/services/cadastros.service';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { StorageService } from 'src/app/services/storage.service';
import { ProdutoApi } from "src/app/model/produto-api";
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
import { Imagem } from 'src/app/model/Imagem';

@Component({
    selector: 'app-cadastro-produto',
    templateUrl: './cadastro-produto.component.html',
    styleUrls: ['./cadastro-produto.component.css'],
    providers: [MessageService, NgxSpinnerService],
    standalone: false
})
export class CadastroProdutoComponent implements OnInit {

  formCadProd: UntypedFormGroup;
  validacoes: Validacoes = new Validacoes();
  produto: Produto;
  produtos: Produto[];
  categorias: Categoria[];
  imagensUpload: File[] = [];
  @ViewChild("imagem")
  inputImagem: ElementRef;
  imagens: Imagem[] = [];
  @Output() produtoCadastrado = new EventEmitter;


  constructor(private formBuilder: UntypedFormBuilder,
    private messageService: MessageService,
    private cadastro: CadastrosService,
    private requisicoes: RequisicoesService,
    private storage: StorageService,
    private spinner: NgxSpinnerService) {

    this.requisicoes.getCategoria().subscribe(
      data => {
        this.categorias = data;
      }
    )
    this.requisicoes.getProdutos().subscribe(
      data => {
        this.produtos = data;
      }
    )
  }

  ngOnInit(): void { this.createForm(new ProdutoApi) }
  createForm(produto: ProdutoApi) {
    produto.categoria = null;
    this.formCadProd = this.formBuilder.group({
      descProduto: [produto.descProduto],
      categoria: [produto.categoria],
      qtdProduto: [produto.qtdProduto],
      valorProduto: [produto.valorProduto]
    });
  }

  permitirNumeros() {
    this.validacoes.cancelarLetras;
  }

  permitirLetras() {
    this.validacoes.cancelarNumeros;
  }

  onSubmit() {
    if (this.imagens.length == 0) {
      return alert("Faça upload das imagens antes de prosseguir");
    }
    if (this.formCadProd.value != null && this.formCadProd.value.descProduto != null) {
      this.cadastro.cadastrarProduto(this.formCadProd.value, this.imagens).subscribe(data => {
        this.formCadProd.reset();
        this.imagensUpload = [];
        this.produtoCadastrado.emit(data);
      })
    } else {
      alert("Erro ao cadastrar pedido")
    }
  }


  async uploadImagens(event) {
    this.spinner.show();
    await event.files.forEach(file => {
      this.cadastro.cadastrarImagem(file).then(
        data => {
          this.imagens.push(new Imagem(data.data.link))
          this.imagens.length == event.files.length ? this.spinner.hide() : ''
        }
      )
    });
  }
}