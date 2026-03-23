import { Component, OnInit } from '@angular/core';
import { Cupom } from 'src/app/model/cupom';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { CadastrosService } from 'src/app/services/cadastros.service';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-cupons',
    templateUrl: './cupons.component.html',
    styleUrls: ['./cupons.component.css'],
    providers: [MessageService],
    standalone: false
})
export class CuponsComponent {
  
  
  Desativar: false
  

  cupons: Cupom[] = [];
  modalRef: BsModalRef;
  checked: boolean;
  cols: any[];
  cupom: Cupom;
  displayDialog: boolean;
  formCupom: UntypedFormGroup;


  constructor(private formBuilder: UntypedFormBuilder,
    private requisicoes: RequisicoesService,
    private cadastro: CadastrosService,
    private messageService: MessageService) {

    this.requisicoes.todosCupons().subscribe(
      data => {
        this.cupons = data;
      }
    )
  }

  desativarCupom() {
    let desativar = false;
    for(let i = 0;i < this.cupons.length;i++) {
      if(this.cupons[i].ativo == true) {
        return this.cupons[i].ativo = desativar;
      }
    }
  }

  createForm(cupom: Cupom) {
    this.formCupom = this.formBuilder.group({
      nome: [cupom.nome],
      desconto: [cupom.desconto]
    });
  }

  ativarCupom(cupom: Cupom) {
    this.requisicoes.atualizarCupom(cupom.codCupom, cupom).subscribe(
      cupomApi => {
        this.showSucessAlter();
      }, error => {
        this.showErrorAlter();
      }
    )
  }

  onRowSelect(event) {

  }

  showDialogToAdd() {
    this.cupom = new Cupom(null, null, null, null);
    this.displayDialog = true;

  }

  cadastrarCupom() {
    this.cadastro.addCupom(this.cupom).subscribe(
      cupom => {
        this.cupons.push(cupom);
        this.showSuccess();
        this.displayDialog = false;

      }
    )
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Cadastro', detail: 'O cupom foi cadastrado com sucesso.' });
  }

  showSucessAlter() {
    this.messageService.add({ severity: 'info', summary: 'Alteração', detail: 'Cupom alterado com sucesso!' });
  }

  showErrorAlter() {
    this.messageService.add({ severity: 'error', summary: 'Alteração', detail: 'Erro ao alterar cupom!' });
  }
}
