import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Services & Models
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { ProdutoApi } from "src/app/model/produto-api";

@Component({
  selector: 'app-alterar-produto',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './alterar-produto.component.html',
  styleUrls: ['./alterar-produto.component.css']
})
export class AlterarProdutoComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private requisicoes = inject(RequisicoesService);

  // Tipando o Input para evitar erros de undefined no template
  @Input() produto: any; 
  @Output() produtoAlterado = new EventEmitter<any>();

  public formAltProd!: FormGroup;

  ngOnInit(): void {
    // Inicializamos o formulário vazio para evitar erros de análise estática
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica se o objeto produto chegou e se o formulário já existe
    if (changes['produto'] && changes['produto'].currentValue && this.formAltProd) {
      const p = changes['produto'].currentValue;
      
      this.formAltProd.patchValue({
        descProduto: p.descricao,
        qtdProduto: p.qtdProduto,
        valorProduto: p.valorProduto
      });

      // Desabilita o nome para não permitir alteração de descrição no estoque
      this.formAltProd.controls['descProduto'].disable();
    }
  }

  private createForm() {
    this.formAltProd = this.fb.group({
      descProduto: [{ value: '', disabled: true }],
      qtdProduto: [0, [Validators.required, Validators.min(0)]],
      valorProduto: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit() {
    if (this.formAltProd.valid) {
      const produtoUpdate = new ProdutoApi();
      produtoUpdate.codProduto = this.produto.codProduto;
      
      // Como o campo descProduto está disabled, o .value não o pega. 
      // Usamos .getRawValue() se precisássemos de todos, 
      // mas aqui só queremos os campos editáveis:
      produtoUpdate.qtdProduto = this.formAltProd.value.qtdProduto;
      produtoUpdate.valorProduto = this.formAltProd.value.valorProduto;

      this.requisicoes.alterarProduto(produtoUpdate).subscribe({
        next: (data) => {
          this.produtoAlterado.emit(data);
        },
        error: (err) => {
          console.error('Erro ao alterar produto', err);
          alert("Erro ao salvar alterações.");
        }
      });
    }
  }
}