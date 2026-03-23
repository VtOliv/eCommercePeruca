import { Component, OnInit, inject } from '@angular/core';
import { Validacoes } from 'src/app/model/validacoes';
import  {  UntypedFormBuilder,  UntypedFormGroup  }  from  '@angular/forms';
import { FaleConosco } from 'src/app/model/faleConosco';
import { CadastrosService } from 'src/app/services/cadastros.service';
import { StorageService } from 'src/app/services/storage.service';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { StatusFaleConosco } from 'src/app/model/statusFaleConosco';


@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
    styleUrls: ['./contato.component.css'],
    standalone: true
})

export class ContatoComponent implements OnInit {
  private formBuilder = inject(UntypedFormBuilder);
  private cadastro = inject(CadastrosService);
  private storage = inject(StorageService);
  private requisicao = inject(RequisicoesService);

  formFaleConosco: UntypedFormGroup;
  validacoes: Validacoes = new Validacoes;
  status: StatusFaleConosco[] = []

  ngOnInit(): void {
    this.createForm(new FaleConosco("", "","","", null));
    this.requisicao.statusFL().subscribe(
      data => {
        this.status = data
      }

    )
     }
   
   createForm(faleConosco: FaleConosco){
     this.formFaleConosco = this.formBuilder.group({
       nomeCompleto: [faleConosco.nomeCompleto],
       telefone: [faleConosco.telefone],
       email: [faleConosco.email],
       mensagem: [faleConosco.mensagem],
       statusFL: [faleConosco.statusFL],      
     })
   }

    onSubmit(){
      this.cadastro.faleConosco(this.formFaleConosco.value).subscribe(
        data => {
          if(data.codFaleConosco != null){
            this.formFaleConosco.reset();
            return alert("Mensagem enviada com sucesso!");          
          }
        }, error =>{
          alert("Mensagem não enviada.")
        })
    }



    permitirLetrasCont(evento: any) {
      this.validacoes.cancelarNumeros(evento);
    }
    permitirNumerosCont(evento: any){
      this.validacoes.cancelarLetras(evento);
    }  
}