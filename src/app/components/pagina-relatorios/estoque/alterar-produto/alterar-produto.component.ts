import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';

import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { ProdutoApi } from "src/app/model/produto-api";


@Component({
    selector: 'app-alterar-produto',
    templateUrl: './alterar-produto.component.html',
    styleUrls: ['./alterar-produto.component.css'],
    standalone: true
})
export class AlterarProdutoComponent implements OnInit, OnChanges {
  formAltProd: UntypedFormGroup;
  @Input() produto;
  @Output() produtoAlterado = new EventEmitter;

  constructor(private formBuilder: UntypedFormBuilder,
    private requisicoes: RequisicoesService) {
  }

  ngOnInit(): void {
    this.createForm(this.produto)
  }

  ngOnChanges(): void {
    if (this.produto.descricao != undefined) {

      this.formAltProd.patchValue({
        descProduto: this.produto.descricao,
        qtdProduto: this.produto.qtdProduto,
        valorProduto: this.produto.valorProduto
      })
      this.formAltProd.controls['descProduto'].disable();
    }
  }

  createForm(produto) {
    this.formAltProd = this.formBuilder.group({
      descProduto: [produto.descricao],
      qtdProduto: [produto.qtdProduto],
      valorProduto: [produto.valorProduto]
    });
  }

  onSubmit() {
    let produto = new ProdutoApi();
    produto.codProduto = this.produto.codProduto;
    produto.qtdProduto = this.formAltProd.value.qtdProduto;
    produto.valorProduto = this.formAltProd.value.valorProduto;
    this.requisicoes.alterarProduto(produto).subscribe(
      data => {
        this.produtoAlterado.emit(data);
      }
    )
  }
}

