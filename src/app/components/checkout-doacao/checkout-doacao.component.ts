import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';


// Models e Services
import { Locais } from 'src/app/model/locais';
import { Validacoes } from 'src/app/model/validacoes';
import { CadastrosService } from 'src/app/services/cadastros.service';
import { StorageService } from 'src/app/services/storage.service';

// Sub-componente
import { FinalizarDoacaoComponent } from './finalizar-doacao/finalizar-doacao.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-checkout-doacao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FinalizarDoacaoComponent,
    FooterComponent,
    HeaderComponent
  ],
  providers: [provideNgxMask()],
  templateUrl: './checkout-doacao.component.html',
  styleUrls: ['./checkout-doacao.component.css']
})
export class CheckoutDoacaoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cadastros = inject(CadastrosService);
  private storage = inject(StorageService);
  private route = inject(Router);
  private sanitizer = inject(DomSanitizer);

  // Propriedades tipadas
  public formPagamento!: FormGroup;
  public validacoes = new Validacoes();
  public vlDoacao = 49.90;
  public mapaUrl!: SafeResourceUrl;

  public locais: Locais[] = [
    new Locais("Instituto do Câncer SP", "https://www.google.com/maps/embed?..."),
    new Locais("AACD", "https://www.google.com/maps/embed?..."),
    new Locais("GRAAC", "https://www.google.com/maps/embed?...")
  ];

  public escolhido: number = 0;
  public localEscolhido: Locais;
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

  private initForm(): void {
    this.formPagamento = this.fb.group({
      numeroCartao: ['', [Validators.required]],
      mesValidade: ['', [Validators.required]],
      anoValidade: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.maxLength(3)]],
      nomeTitular: ['', [Validators.required]],
      cpfTitular: ['', [Validators.required]] // Alinhado com o seu HTML anterior
    });
  }

  public mudarLocal(): void {
    this.localEscolhido = this.locais[this.escolhido];
    this.atualizarMapa();
  }

  private atualizarMapa(): void {
    // Sanitização necessária para evitar o erro de segurança do Angular no iframe
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
        error: (err) => console.error("Falha na doação:", err)
      });
    }
  }

  // Validações de input
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

    if (Number(anoValidade) === data.getFullYear() && Number(mesValidade) <= (data.getMonth() + 1)) {
      this.formPagamento.patchValue({
        mesValidade: data.getMonth() + 2
      });
    }
  }
}

function provideNgxMask(): import("@angular/core").Provider {
  throw new Error('Function not implemented.');
}
