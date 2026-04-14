import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { RequisicoesService } from '../../../services/requisicoes.service';
import { Imagem } from 'src/app/model/Imagem';
import { Produto } from 'src/app/model/produto';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CarrosselComponent implements OnChanges {
  private readonly requisicoes = inject(RequisicoesService);

  @Input() idProduto?: number;

  produto?: Produto;
  primeiraImagem: Imagem = new Imagem('');
  imagens: Imagem[] = [];

  ngOnChanges(): void {
    if (!this.idProduto) {
      this.resetImagens();
      return;
    }

    this.requisicoes.buscarProduto(this.idProduto).subscribe({
      next: (produto) => {
        this.produto = produto;
        const todas = produto?.imagens ?? [];
        this.primeiraImagem = todas[0] ?? new Imagem('');
        this.imagens = todas.length > 1 ? todas.slice(1) : [];
      },
      error: () => this.resetImagens()
    });
  }

  private resetImagens(): void {
    this.primeiraImagem = new Imagem('');
    this.imagens = [];
  }
}