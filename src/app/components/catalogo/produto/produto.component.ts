import { Component, OnInit, OnChanges, Input, inject, SimpleChanges } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

// Models e Services
import { Produto } from 'src/app/model/produto';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CurrencyPipe],
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit, OnChanges {
  // Injeções modernas
  private requisicoes = inject(RequisicoesService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  // Controle de subscrição para evitar memory leak
  private destroy$ = new Subject<void>();

  // Inputs e Estado
  @Input() categoria: number = 0;
  @Input() filtro: string = '';
  
  public produtos: Produto[] = [];
  public produtosFiltrados: Produto[] = [];
  public ordenacao = "1";
  public formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };

  ngOnInit(): void {
    // 1. Carrega os produtos
    this.requisicoes.getProdutos()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.produtos = data;
        this.aplicarFiltrosGlobais();
      });

    // 2. Escuta mudanças na URL (Busca global)
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['filtro'] !== undefined) {
          this.filtro = params['filtro'];
          this.aplicarFiltrosGlobais();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Só re-filtra se os inputs realmente mudarem e os produtos já existirem
    if ((changes['categoria'] || changes['filtro']) && this.produtos.length > 0) {
      this.aplicarFiltrosGlobais();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private aplicarFiltrosGlobais(): void {
    // Centraliza a lógica de filtro: Categoria + Texto de busca
    const termoBusca = this.filtro.normalize('NFD')
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z ])/g, '')
      .toLowerCase();

    this.produtosFiltrados = this.produtos.filter(p => {
      const matchCategoria = this.categoria === 0 || p.categoria?.codigo === this.categoria;
      const descNormalizada = p.descricao?.normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z ])/g, '')
        .toLowerCase();
      const matchTexto = descNormalizada?.includes(termoBusca) || termoBusca === "";
      
      return matchCategoria && matchTexto;
    });

    // Reaplica a ordenação após filtrar
    this.ordenarPor();
  }

  abrirPaginaProduto(id: number): void {
    this.router.navigate(['produto', id]);
  }

  ordenarPor(): void {
    const ordenacoes: Record<string, () => void> = {
      "1": () => this.ordenarPadrao(),
      "2": () => this.produtosFiltrados.sort((a, b) => (a.valorProduto ?? 0) - (b.valorProduto ?? 0)),
      "3": () => this.produtosFiltrados.sort((a, b) => (b.valorProduto ?? 0) - (a.valorProduto ?? 0)),
      "4": () => this.produtosFiltrados.sort((a, b) => (a.descricao ?? '').localeCompare(b.descricao ?? '')),
      "5": () => this.produtosFiltrados.sort((a, b) => (b.descricao ?? '').localeCompare(a.descricao ?? ''))
    };

    const acao = ordenacoes[this.ordenacao];
    if (acao) acao();
  }

  private ordenarPadrao(): void {
    // Mantém a ordem original do array filtrado
  }

}