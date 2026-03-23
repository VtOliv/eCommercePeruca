import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

// Models e Services
import { Endereco } from 'src/app/model/endereco';
import { Uf } from 'src/app/model/uf';
import { Validacoes } from 'src/app/model/validacoes';
import { RequisicoesService } from 'src/app/services/requisicoes.service';

@Component({
    selector: 'app-cadastro-endereco',
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './cadastro-endereco.component.html',
    styleUrls: ['./cadastro-endereco.component.css']
})
export class CadastroEnderecoComponent implements OnInit {
  
  // Injeção de dependências moderna (Angular 16+)
  private fb = inject(FormBuilder);
  private http = inject(RequisicoesService);

  @Output() novoEndereco = new EventEmitter<any>();
  
  formEndereco!: FormGroup;
  estados: Uf[] = [];
  validacoes: Validacoes = new Validacoes();

  ngOnInit(): void {
    // Inicializa o formulário
    this.createForm(new Endereco("", "", null, "", "", "", ""));

    // Busca os estados
    this.http.getEstados().subscribe(dados => {
      this.estados = dados;
    });
  }

  private createForm(endereco: Endereco): void {
    this.formEndereco = this.fb.group({
      destinatario: [endereco.destinatario],
      cep: [endereco.cep],
      logradouro: [endereco.logradouro],
      numero: [endereco.numero],
      bairro: [endereco.bairro],
      localidade: [endereco.localidade],
      uf: [endereco.uf],
      complemento: [endereco.complemento]
    });
  }

  preencherEndereco(): void {
    const cep = this.formEndereco.get('cep')?.value;
    
    if (cep && cep.length === 8) {
      this.http.getEnderecoViaCep(cep).subscribe({
        next: (dados) => {
          this.formEndereco.patchValue({
            localidade: dados.localidade,
            bairro: dados.bairro,
            uf: dados.uf,
            logradouro: dados.logradouro
          });
        },
        error: (err) => console.error("Erro ao buscar CEP", err)
      });
    }
  }

  validarCep(evento: Event): void {
    this.validacoes.cancelarLetras(evento);
  }

  permitirLetras(evento: Event): void {
    this.validacoes.cancelarNumeros(evento);
  }
}