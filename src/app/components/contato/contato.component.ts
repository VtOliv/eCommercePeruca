import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Services & Models
import { CadastrosService } from 'src/app/services/cadastros.service';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { FaleConosco } from 'src/app/model/faleConosco';
import { StatusFaleConosco } from 'src/app/model/statusFaleConosco';
import { Validacoes } from 'src/app/model/validacoes';

// Componentes Globais (Standalone)
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

// Máscaras
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  // Injeções modernas
  private fb = inject(FormBuilder);
  private cadastro = inject(CadastrosService);
  private requisicao = inject(RequisicoesService);
  private sanitizer = inject(DomSanitizer);

  // Propriedades tipadas
  public formFaleConosco!: FormGroup;
  public validacoes = new Validacoes();
  public status: StatusFaleConosco[] = [];
  
  // Variável para renderizar o Google Maps com segurança
  public mapaUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.700342939106!2d-46.6586015!3d-23.5432857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce583679051563%3A0xc3f6a297e6414264!2sR.%20Minas%20Gerais%2C%20316%20-%20Higien%C3%B3polis%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001244-010!5e0!3m2!1spt-BR!2sbr!4v1611111111111"
  );

  ngOnInit(): void {
    this.initForm();
    this.carregarStatus();
  }

  private initForm() {
    this.formFaleConosco = this.fb.group({
      nomeCompleto: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', [Validators.required, Validators.minLength(5)]],
      statusFL: [null, [Validators.required]]
    });
  }

  private carregarStatus() {
    this.requisicao.statusFL().subscribe({
      next: (data) => this.status = data,
      error: (err) => console.error('Erro ao buscar status', err)
    });
  }

  onSubmit() {
    if (this.formFaleConosco.valid) {
      this.cadastro.faleConosco(this.formFaleConosco.value).subscribe({
        next: (res) => {
          const data = res as FaleConosco;
          if (data?.codFaleConosco != null) {
            this.formFaleConosco.reset();
            alert("Mensagem enviada com sucesso!");
          }
        },
        error: () => alert("Erro técnico: Mensagem não enviada.")
      });
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  }

  // Métodos de validação para o template
  permitirLetrasCont(evento: Event) {
    this.validacoes.cancelarNumeros(evento);
  }

  permitirNumerosCont(evento: Event) {
    this.validacoes.cancelarLetras(evento);
  }
}