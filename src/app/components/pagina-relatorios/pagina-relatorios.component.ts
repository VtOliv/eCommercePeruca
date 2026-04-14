import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ResumoDashboardComponent } from './resumo-dashboard/resumo-dashboard.component';
import { MenuRelatoriosComponent } from './menu-relatorios/menu-relatorios.component';
import { NavRelatoriosComponent } from './nav-relatorios/nav-relatorios.component';


@Component({
    selector: 'app-pagina-relatorios',
    templateUrl: './pagina-relatorios.component.html', 
    styleUrls: ['./pagina-relatorios.component.css'],    
    imports: [MenuRelatoriosComponent, NavRelatoriosComponent, ResumoDashboardComponent],
    standalone: true
})
export class PaginaRelatoriosComponent implements OnInit {
  private storage = inject(StorageService);


  funcionario;

  constructor() { 
    this.funcionario = this.storage.recuperarFuncionario();
    console.log(this.funcionario)
  }

  ngOnInit(): void {
    
  }
}
