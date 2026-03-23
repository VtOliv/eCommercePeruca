import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-relatorios',
    templateUrl: './nav-relatorios.component.html',
    styleUrls: ['./nav-relatorios.component.css'],
    standalone: true
})
export class NavRelatoriosComponent implements OnInit {
  private storage = inject(StorageService);
  private route = inject(Router);


  ngOnInit(): void {
  }

  deslogar() {
    console.log("Botao Funciona");
    this.storage.removerFuncionario();
    this.route.navigate(["funcionario"]);

  }

}
