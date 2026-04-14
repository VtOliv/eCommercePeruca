import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

// Services & Models
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { ProdutoApi } from 'src/app/model/produto-api';

// Layout e Sub-Componentes
import { NavRelatoriosComponent } from '../nav-relatorios/nav-relatorios.component';
import { MenuRelatoriosComponent } from '../menu-relatorios/menu-relatorios.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { AlterarProdutoComponent } from './alterar-produto/alterar-produto.component';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    NavRelatoriosComponent, // Importante adicionar aqui
    MenuRelatoriosComponent,
    CadastroProdutoComponent,
    AlterarProdutoComponent
  ],
  providers: [MessageService],
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {
  private requisicoes = inject(RequisicoesService);
  private messageService = inject(MessageService);

  // Propriedades vinculadas ao HTML
  public produtos: any[] = [];
  public cols: any[] = [];
  public produtoAlt: ProdutoApi = new ProdutoApi();
  
  public displayDialog: boolean = false;
  public displayDialogAlt: boolean = false;
  
  // Formatação usada no template: {{produtos.valorProduto.toLocaleString('pt-BR', formato)}}
  public formato: Intl.NumberFormatOptions = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };

  ngOnInit(): void {
    this.carregarProdutos();

    this.cols = [
      { field: 'codProduto', header: 'Código' },
      { field: 'descricao', header: 'Nome' },
      { field: 'valorProduto', header: 'Preço' },
      { field: 'categoria.descricao', header: 'Categoria' },
      { field: 'qtdProduto', header: 'Quantidade' }
    ];
  }

  carregarProdutos(): void {
    this.requisicoes.getProdutos().subscribe({
      next: (data) => this.produtos = data,
      error: (err) => console.error('Erro ao carregar estoque', err)
    });
  }

  filterTable(table: { filterGlobal: (v: string, m: string) => void }, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  // Abre diálogo de adição
  showDialogToAdd() {
    this.displayDialog = true;
  }

  // Abre diálogo de alteração passando o produto selecionado
  showDialogToAlt(produto: any) {
    // Criamos uma cópia para o diálogo não alterar a tabela antes de salvar
    this.produtoAlt = JSON.parse(JSON.stringify(produto));
    this.displayDialogAlt = true;
  }

  // Recebe o evento (produtoCadastrado) do <app-cadastro-produto>
  receberProduto(novoProduto: any) {
    this.produtos = [...this.produtos, novoProduto];
    this.displayDialog = false;
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Cadastro realizado', 
      detail: 'O produto foi cadastrado com sucesso.' 
    });
  }

  // Recebe o evento (produtoAlterado) do <app-alterar-produto>
  receberProdutoAlterado(produtoEditado: any) {
    const index = this.produtos.findIndex(p => p.codProduto === produtoEditado.codProduto);
    if (index !== -1) {
      const novaLista = [...this.produtos];
      novaLista[index] = produtoEditado;
      this.produtos = novaLista;
    }
    this.displayDialogAlt = false;
    this.messageService.add({ 
      severity: 'info', 
      summary: 'Produto atualizado', 
      detail: 'O produto foi atualizado com sucesso.' 
    });
  }
}