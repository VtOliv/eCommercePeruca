import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaleConosco } from 'src/app/model/faleConosco';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { NavRelatoriosComponent } from '../nav-relatorios/nav-relatorios.component';
import { MenuRelatoriosComponent } from '../menu-relatorios/menu-relatorios.component';

@Component({
    selector: 'app-painel-fale-conosco',
    templateUrl: './painel-fale-conosco.component.html',
    styleUrls: ['./painel-fale-conosco.component.css'],
    standalone: true,
    imports: [CommonModule, NavRelatoriosComponent, MenuRelatoriosComponent]
})
export class PainelFaleConoscoComponent implements OnInit {
  private requisicoes = inject(RequisicoesService);


  mensagens: FaleConosco[] =[];

  ngOnInit(): void {
    this.requisicoes.buscarMensagens().subscribe({
      next: dados => {
        this.mensagens = dados;
      }
    });
  }

}
