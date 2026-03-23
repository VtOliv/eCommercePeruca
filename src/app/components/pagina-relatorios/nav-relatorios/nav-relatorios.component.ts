import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-relatorios',
    templateUrl: './nav-relatorios.component.html',
    styleUrls: ['./nav-relatorios.component.css'],
    standalone: true
})
export class NavRelatoriosComponent implements OnInit {

  constructor(private storage: StorageService, private route: Router) { }

  ngOnInit(): void {
  }

  deslogar() {
    console.log("Botao Funciona");
    this.storage.removerFuncionario();
    this.route.navigate(["funcionario"]);

  }

}
