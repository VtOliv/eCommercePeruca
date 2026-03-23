import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Produto } from 'src/app/model/produto';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Validacoes } from 'src/app/model/validacoes';
import { UntypedFormGroup } from '@angular/forms';
import { Categoria } from 'src/app/model/categoria';
import { MessageService } from 'primeng/api';
import { ProdutoApi } from 'src/app/model/produto-api';

@Component({
    selector: 'app-estoque',
    templateUrl: './estoque.component.html',
    styleUrls: ['./estoque.component.css'],
    providers: [MessageService],
    standalone: false
})
export class EstoqueComponent implements OnInit {
  formCadProd: UntypedFormGroup;
  validacoes: Validacoes = new Validacoes();
  produto: Produto;
  categorias: Categoria[];
  produtoAlt: ProdutoApi = new ProdutoApi();
  
  formato = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' };

  produtos: any[] = [];
  first: number = 0;
  cols: any[];
  display: boolean = false;
  displayDialog: boolean;
  displayDialogAlt: boolean;

  constructor(private requisicoes: RequisicoesService,
    private modalService: BsModalService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.requisicoes.getProdutos().subscribe(
      data => {
        this.produtos = data
      }
    )

    this.cols = [
      { field: 'imagem', header: 'Produto' },
      { field: 'codProduto', header: 'Código' },
      { field: 'descricao', header: 'Nome' },
      { field: 'valorProduto', header: 'Preço' },
      { field: 'categoria', header: 'Categoria' },
      { field: 'qtdProduto', header: 'Quantidade' }
    ];
  }

  showDialogToAdd() {
    this.displayDialog = true;
  }
  showDialogToAlt(produto){
    this.produtoAlt = produto;
    this.displayDialogAlt = true;
    }
  
  receberProdutoAlterado(produto){
    let index = this.produtos.indexOf(this.produtoAlt);
    this.produtos[index] = produto;
    this.displayDialogAlt = false;
    this.showSuccessAlt();
  }
  
  receberProduto(produto){
    this.produtos.push(produto);
    this.displayDialog = false;
    this.showSuccess();
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Cadastro realizado', detail: 'O produto foi cadastrado com sucesso.' });
  }
  showSuccessAlt() {
    this.messageService.add({ severity: 'info', summary: 'Produto atualizado', detail: 'O produto foi atualizado com sucesso.' });
  }
 
}
