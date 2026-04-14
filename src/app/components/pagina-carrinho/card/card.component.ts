import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Services & Models
import { StorageService } from 'src/app/services/storage.service';
import { Carrinho } from 'src/app/model/carrinho';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  private storage = inject(StorageService);
  private route = inject(Router);

  public carrinho: Carrinho[] = [];

  @Output() atualizarCarrinho = new EventEmitter<void>();

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  private carregarCarrinho(): void {
    // Garante que o carrinho comece como um array vazio se o storage retornar null
    this.carrinho = this.storage.recuperarCarrinho() ?? [];
  }

  // Getter reativo: O total sempre estará certo se o carrinho mudar
  get total(): number {
    return this.carrinho.reduce((acc, item) => {
      const preco = item.produto?.valorProduto ?? 0;
      const qtd = item.quantidade ?? 0;
      return acc + (preco * qtd);
    }, 0);
  }

  public mudarQuantidade(valor: number, item: Carrinho): void {
    const index = this.carrinho.indexOf(item);
    if (index === -1) return;

    if (item.quantidade === 1 && valor < 0) {
      this.removerProduto(item);
      return;
    }

    const quantidadeAtual = item.quantidade ?? 0;

    if (valor > 0 && quantidadeAtual < 6) {
      // 2. Incrementamos usando o valor garantido
      item.quantidade = quantidadeAtual + 1;
    } else if (valor < 0 && quantidadeAtual > 0) {
      // 3. Decrementamos garantindo que não fique negativo
      item.quantidade = quantidadeAtual - 1;
    }
    this.salvarEAtualizar();
  }

  public removerProduto(item: Carrinho): void {
    this.carrinho = this.carrinho.filter(p => p !== item);
    this.salvarEAtualizar();
  }

  private salvarEAtualizar(): void {
    this.storage.salvarCarrinho(this.carrinho);
    this.atualizarCarrinho.emit();
  }

  public irCheckout(): void {
    const user = this.storage.recuperarUsuario();

    if (!user) {
      alert("Você não está logado!");
      return;
    }

    if (this.carrinho.length > 0) {
      this.route.navigate(["/checkout"]);
    } else {
      alert("Para continuar, escolha um produto!");
      this.route.navigate(["/catalogo"]);
    }
  }
}