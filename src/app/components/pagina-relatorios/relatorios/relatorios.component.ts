import { Component, OnInit } from '@angular/core';
import { CommonModule } from 'node_modules/@angular/common/types/_common_module-chunk';
import { MenuRelatoriosComponent } from '../menu-relatorios/menu-relatorios.component';
import { NavRelatoriosComponent } from '../nav-relatorios/nav-relatorios.component';

@Component({
    selector: 'app-relatorios',
    templateUrl: './relatorios.component.html',
    styleUrls: ['./relatorios.component.css'],
    standalone: true,
    imports: [CommonModule, NavRelatoriosComponent, MenuRelatoriosComponent]
})
export class RelatoriosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
