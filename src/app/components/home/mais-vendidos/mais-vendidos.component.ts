import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Services & Models
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Produto } from 'src/app/model/produto';

@Component({
  selector: 'app-mais-vendidos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './mais-vendidos.component.html',
  styleUrls: ['./mais-vendidos.component.css']
})
export class MaisVendidosComponent implements OnInit {
  private requisicoes = inject(RequisicoesService);
  private route = inject(Router);

  public produtosVisiveis: Produto[] = [];

  ngOnInit(): void {
    this.carregarMaisVendidos();
  }

  private carregarMaisVendidos(): void {
    this.requisicoes.getProdutosMaisVendidos().subscribe({
      next: (data) => this.produtosVisiveis = data ?? [],
      error: (err) => console.error('Erro ao carregar mais vendidos', err)
    });
  }

  public abrirPaginaProduto(id?: number): void {
    if (id) {
      this.route.navigate(['/produto', id]);
    }
  }
}