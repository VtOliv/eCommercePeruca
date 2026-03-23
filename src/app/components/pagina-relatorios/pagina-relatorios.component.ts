import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';


@Component({
    selector: 'app-pagina-relatorios',
    templateUrl: './pagina-relatorios.component.html',
    styleUrls: ['./pagina-relatorios.component.css'],
    standalone: true
})
export class PaginaRelatoriosComponent implements OnInit {

  funcionario;

  constructor(private storage: StorageService) { 
    this.funcionario = this.storage.recuperarFuncionario();
    console.log(this.funcionario)
  }

  ngOnInit(): void {
    
  }
}
