import { Component, OnInit, inject } from '@angular/core';
import { FaleConosco } from 'src/app/model/faleConosco';
import { RequisicoesService } from 'src/app/services/requisicoes.service';

@Component({
    selector: 'app-painel-fale-conosco',
    templateUrl: './painel-fale-conosco.component.html',
    styleUrls: ['./painel-fale-conosco.component.css'],
    standalone: true
})
export class PainelFaleConoscoComponent implements OnInit {
  private requisicoes = inject(RequisicoesService);


  mensagens: FaleConosco[] =[];

  ngOnInit(): void {
    this.requisicoes.buscarMensagens().subscribe(
      dados => {
        this.mensagens = dados;
      }
    )
  }

}
