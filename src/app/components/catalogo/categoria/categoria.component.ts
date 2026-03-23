import { Component, OnInit, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importação obrigatória para standalone
import { Categoria } from "src/app/model/categoria";
import { RequisicoesService } from 'src/app/services/requisicoes.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  // CORREÇÃO: Usar 'imports' para módulos/diretivas, não 'provide'
  imports: [CommonModule], 
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  
  // Melhor prática: Injeção com inject() na v21
  private requisicoes = inject(RequisicoesService);

  categoriasVisiveis: Categoria[] = [];

  @Output() categClick = new EventEmitter<Categoria>(); // Tipagem do EventEmitter

  ngOnInit(): void {
    // Mova a lógica de carregamento para o ngOnInit
    this.requisicoes.getCategoria().subscribe({
      next: (data) => {
        this.categoriasVisiveis = data;
        this.categoriasVisiveis.push(new Categoria("todos", 0));
      },
      error: (err) => console.error('Erro ao buscar categorias:', err)
    });
  }

  filtrarProds(c: Categoria) {
    this.categClick.emit(c);
  }
}