import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

// Services & Models
import { Locais } from 'src/app/model/locais';
import { Validacoes } from 'src/app/model/validacoes';
import { CadastrosService } from 'src/app/services/cadastros.service';
import { StorageService } from 'src/app/services/storage.service';

// Sub-componentes
import { CarrinhoDoacaoComponent } from '../carrinho-doacao/carrinho-doacao.component';

// Diretivas de Máscara (Ngx-Mask)
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-finalizar-doacao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    CarrinhoDoacaoComponent
  ],
  providers: [provideNgxMask()],
  templateUrl: './finalizar-doacao.component.html',
  styleUrls: ['./finalizar-doacao.component.css']
})
export class FinalizarDoacaoComponent implements OnInit {
  // Injeções Modernas
  private fb = inject(FormBuilder);
  private cadastros = inject(CadastrosService);
  private storage = inject(StorageService);
  private route = inject(Router);
  private sanitizer = inject(DomSanitizer);

  // Propriedades do Componente
  public formPagamento!: FormGroup;
  public validacoes = new Validacoes();
  public vlDoacao = 49.90;
  
  public locais: Locais[] = [
    new Locais("Instituto do Câncer SP", "https://www.google.com/maps/embed?pb=!1m18..."),
    new Locais("AACD", "https://www.google.com/maps/embed?pb=!1m18..."),
    new Locais("GRAAC", "https://www.google.com/maps/embed?pb=!1m18...")
  ];
  
  public escolhido: number = 0;
  public localEscolhido: Locais;
  public mapaUrl!: SafeResourceUrl; // URL segura para o iframe

  public dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public anos: number[] = [];

  constructor() {
    this.localEscolhido = this.locais[this.escolhido];
    this.anos = this.gerarAnosValidade();
  }

  ngOnInit(): void {
    this.initForm();
    this.atualizarMapa();
  }

  private initForm() {
    this.formPagamento = this.fb.group({
      numeroCartao: ['', [Validators.required]],
      mesValidade: ['', [Validators.required]],
      anoValidade: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.maxLength(3)]],
      nomeTitular: ['', [Validators.required]],
      cpfTitular: ['', [Validators.required]] // Campo adicionado para bater com o HTML
    });
  }

  public mudarLocal(): void {
    this.localEscolhido = this.locais[this.escolhido];
    this.atualizarMapa();
  }

  private atualizarMapa(): void {
    // Transforma a string em uma URL confiável para o Angular
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.localEscolhido.link);
  }

  public finalizarDoacao(): void {
    if (this.formPagamento.valid) {
      this.cadastros.cadastrarDoacao(this.localEscolhido, this.vlDoacao).subscribe({
        next: (dados) => {
          if (dados) {
            this.route.navigate(['/finalizar-compra']);
          }
        },
        error: (err) => console.error("Erro na doação", err)
      });
    } else {
      alert("Por favor, preencha os dados de pagamento corretamente.");
    }
  }

  // Métodos de utilidade
  public permitirNumeros(evento: Event): void {
    this.validacoes.cancelarLetras(evento);
  }

  public permitirLetras(evento: Event): void {
    this.validacoes.cancelarNumeros(evento);
  }

  private gerarAnosValidade(): number[] {
    const anos: number[] = [];
    const anoAtual = new Date().getFullYear();
    for (let i = 0; i <= 20; i++) {
      anos.push(anoAtual + i);
    }
    return anos;
  }

  public verificarValidade(): void {
    const data = new Date();
    const { anoValidade, mesValidade } = this.formPagamento.value;

    if (anoValidade == data.getFullYear() && mesValidade <= (data.getMonth() + 1)) {
      this.formPagamento.patchValue({
        mesValidade: data.getMonth() + 2
      });
    }
  }
}