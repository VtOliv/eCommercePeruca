import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CarrosselComponent } from './carrossel/carrossel.component';
import { ComprarComponent } from './comprar/comprar.component';
import { ProdutosRecomendadosComponent } from './produtos-recomendados/produtos-recomendados.component';

@Component({
    selector: 'app-pagina-produto',
    templateUrl: './pagina-produto.component.html',
    styleUrls: ['./pagina-produto.component.css'],
    standalone: true,
    imports: [
      CommonModule,
      HeaderComponent,
      FooterComponent,
      CarrosselComponent,
      ComprarComponent,
      ProdutosRecomendadosComponent
    ]
})
export class PaginaProdutoComponent implements OnInit {
  private route = inject(ActivatedRoute);

  id: number | null = null;
  atualizarCarrinho = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const parsedId = idParam ? Number(idParam) : NaN;
    this.id = Number.isFinite(parsedId) ? parsedId : null;
  }

  atualizar(): void {
    this.atualizarCarrinho = !this.atualizarCarrinho;
  }
}
