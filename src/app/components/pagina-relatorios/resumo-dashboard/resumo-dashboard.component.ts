import { Component, OnInit, inject } from '@angular/core';
import { Produto } from 'src/app/model/produto';
import { Compra } from 'src/app/model/compra';
import { Cupom } from 'src/app/model/cupom';
import { RequisicoesService } from 'src/app/services/requisicoes.service';


@Component({
    selector: 'app-resumo-dashboard',
    templateUrl: './resumo-dashboard.component.html',
    styleUrls: ['./resumo-dashboard.component.css'],
    standalone: true
})
export class ResumoDashboardComponent implements OnInit {

  dataProd: any;
  dataPed: any;
  dataCupons: any;
  produtos : Produto[] = [];
  pedido : Compra[] = [];
  cupons : Cupom[] = [];

  constructor() {
    const requisicoes = inject(RequisicoesService);

    requisicoes.todosCupons().subscribe(
      data => {
        this.cupons = data;  
      }
     )

    requisicoes.getProdutos().subscribe(
      data => {
        this.produtos = data;
      }
    )

    requisicoes.getPedidos().subscribe(
      data => {
        this.pedido = data;
      }
    )
    
}


  ngOnInit(): void {     
     this.dataProd = {
    labels: ['Resumo: Produtos'],
    datasets: [
      {
        label: 'Produtos Cadastrados',
        backgroundColor: '#28a745',
        borderColor: '#1E88E5',
        data: [3]
      },
      {
        label: 'Vendidos',
        backgroundColor: '#6f42c1',
        borderColor: '#1E88E5',
        data: [3]
      },
      {
        label: 'Em Falta',
        backgroundColor: '#2f97c3',
        borderColor: '#1E88E5',
        data: [3]
      }
    ]
  }


  this.dataPed = {
    labels: ['Resumo: Pedidos'],
    datasets: [
      {
        label: 'Concluídos',
        backgroundColor: '#28a745',
        borderColor: '#1E88E5',
        data: [3]
      },
      {
        label: 'Entregues',
        backgroundColor: '#6f42c1',
        borderColor: '#1E88E5',
        data: [3]
      },
      {
        label: 'Cancelados',
        backgroundColor: '#2f97c3',
        borderColor: '#1E88E5',
        data: [3]
      }
    ]
  }


  this.dataCupons = {
    labels: ['Resumo: Cupons'],
    datasets: [
      {
        label: 'Cupons Cadastrados',
        backgroundColor: '#28a745',
        borderColor: '#1E88E5',
        data: [3]
      },
      {
        label: 'Ativos',
        backgroundColor: '#6f42c1',
        borderColor: '#1E88E5',
        data: [3]
      },
      {
        label: 'Usos',
        backgroundColor: '#2f97c3',
        borderColor: '#1E88E5',
        data: [3]
      }
    ]
  }
  }

}
