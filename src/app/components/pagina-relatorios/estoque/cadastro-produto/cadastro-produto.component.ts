import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// PrimeNG & Layout
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

// Services & Models
import { CadastrosService } from 'src/app/services/cadastros.service';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Categoria } from 'src/app/model/categoria';
import { ProdutoApi } from "src/app/model/produto-api";
import { Imagem } from 'src/app/model/Imagem';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxSpinnerModule
  ],
  providers: [MessageService],
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  // Injeção de dependências (Angular 21 style)
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private cadastro = inject(CadastrosService);
  private requisicoes = inject(RequisicoesService);
  private spinner = inject(NgxSpinnerService);

  // Propriedades do template
  public formCadProd!: FormGroup;
  public categorias: Categoria[] = [];
  public imagens: Imagem[] = [];
  public imagensUpload: any[] = []; // Para a lista visual no p-fileUpload

  @Output() produtoCadastrado = new EventEmitter<any>();

  ngOnInit(): void {
    this.carregarCategorias();
    this.initForm();
  }

  private carregarCategorias() {
    this.requisicoes.getCategoria().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Erro ao carregar categorias', err)
    });
  }

  private initForm() {
    this.formCadProd = this.fb.group({
      descProduto: ['', [Validators.required]],
      categoria: [null, [Validators.required]],
      qtdProduto: [1, [Validators.required, Validators.min(1)]],
      valorProduto: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  async uploadImagens(event: any) {
    this.spinner.show();
    this.imagensUpload = event.files; // Atualiza a lista visual do @if no HTML
    this.imagens = []; 

    try {
      // Faz o upload de todas as imagens em paralelo
      const uploadPromises = event.files.map((file: File) => 
        this.cadastro.cadastrarImagem(file).then((res: any) => {
          this.imagens.push(new Imagem(res.data.link));
        })
      );

      await Promise.all(uploadPromises);
      this.spinner.hide();
      this.messageService.add({ severity: 'success', summary: 'Upload concluído', detail: 'Imagens processadas com sucesso.' });
    } catch (error) {
      this.spinner.hide();
      console.error('Erro no upload', error);
      alert("Falha ao carregar imagens. Tente novamente.");
    }
  }

  onSubmit() {
    if (this.imagens.length === 0) {
      alert("Faça upload das imagens antes de prosseguir");
      return;
    }

    if (this.formCadProd.valid) {
      this.spinner.show();
      
      // Mapeia os dados do formulário para o formato que seu backend espera
      this.cadastro.cadastrarProduto(this.formCadProd.value, this.imagens).subscribe({
        next: (data) => {
          this.spinner.hide();
          this.formCadProd.reset();
          this.imagensUpload = [];
          this.imagens = [];
          this.produtoCadastrado.emit(data); // Notifica o EstoqueComponent pai
        },
        error: (err) => {
          this.spinner.hide();
          console.error('Erro no cadastro', err);
          alert("Erro ao cadastrar produto. Verifique os dados.");
        }
      });
    } else {
      alert("Preencha todos os campos obrigatórios.");
    }
  }
}