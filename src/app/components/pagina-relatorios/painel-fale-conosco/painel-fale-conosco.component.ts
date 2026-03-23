import { Component, OnInit } from '@angular/core';
import { FaleConosco } from 'src/app/model/faleConosco';
import { RequisicoesService } from 'src/app/services/requisicoes.service';

@Component({
    selector: 'app-painel-fale-conosco',
    templateUrl: './painel-fale-conosco.component.html',
    styleUrls: ['./painel-fale-conosco.component.css'],
    standalone: true
})
export class PainelFaleConoscoComponent implements OnInit {

  mensagens: FaleConosco[] =[];

  constructor(private requisicoes: RequisicoesService) { }

  ngOnInit(): void {
    this.requisicoes.buscarMensagens().subscribe(
      dados => {
        this.mensagens = dados;
      }
    )
  }

}
