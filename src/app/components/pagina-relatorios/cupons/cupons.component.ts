import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cupom } from 'src/app/model/cupom';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { CadastrosService } from 'src/app/services/cadastros.service';
import { MessageService } from 'primeng/api';
import { NavRelatoriosComponent } from '../nav-relatorios/nav-relatorios.component';
import { MenuRelatoriosComponent } from '../menu-relatorios/menu-relatorios.component';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'app-cupons',
    templateUrl: './cupons.component.html',
    styleUrls: ['./cupons.component.css'],
    providers: [MessageService],
    standalone: true,
    imports: [
      FormsModule,
      NavRelatoriosComponent,
      MenuRelatoriosComponent,
      TableModule,
      Dialog,
      ToggleSwitch,
      Toast,
      ButtonModule
    ]
})
export class CuponsComponent {
  private requisicoes = inject(RequisicoesService);
  private cadastro = inject(CadastrosService);
  private messageService = inject(MessageService);

  cupons: Cupom[] = [];
  cupom: Cupom = new Cupom();
  displayDialog = false;

  constructor() {
    this.requisicoes.todosCupons().subscribe(
      data => {
        this.cupons = data;
      }
    );
  }

  desativarCupom(): void {
    for (let i = 0; i < this.cupons.length; i++) {
      if (this.cupons[i].ativo === true) {
        this.cupons[i].ativo = false;
        return;
      }
    }
  }

  ativarCupom(cupom: Cupom): void {
    this.requisicoes.atualizarCupom(cupom.codCupom, cupom).subscribe({
      next: () => {
        this.showSucessAlter();
      },
      error: () => {
        this.showErrorAlter();
      }
    });
  }

  onRowSelect(event: unknown): void {
    // handle row selection
  }

  showDialogToAdd(): void {
    this.cupom = new Cupom();
    this.displayDialog = true;
  }

  cadastrarCupom(): void {
    this.cadastro.addCupom(this.cupom).subscribe(
      cupom => {
        this.cupons.push(cupom as Cupom);
        this.showSuccess();
        this.displayDialog = false;
      }
    );
  }

  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Cadastro', detail: 'O cupom foi cadastrado com sucesso.' });
  }

  showSucessAlter(): void {
    this.messageService.add({ severity: 'info', summary: 'Alteração', detail: 'Cupom alterado com sucesso!' });
  }

  showErrorAlter(): void {
    this.messageService.add({ severity: 'error', summary: 'Alteração', detail: 'Erro ao alterar cupom!' });
  }
}
