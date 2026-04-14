import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequisicoesService } from 'src/app/services/requisicoes.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-login-relatorios',
    templateUrl: './login-relatorios.component.html',
    styleUrls: ['./login-relatorios.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule]
})
export class LoginRelatoriosComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private requisicoes = inject(RequisicoesService);
  private route = inject(Router);
  private storage = inject(StorageService);

  formFunc!: FormGroup;

  ngOnInit(): void {
    this.formFunc = this.formBuilder.group({
      matricula: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    });

    if (this.storage.recuperarFuncionario() != null) {
      this.route.navigate(['pg-relatorios']);
    }
  }

  login(): void {
    if (this.formFunc.valid) {
      this.requisicoes.loginFunc(this.formFunc.value).subscribe({
        next: funcionario => {
          if (funcionario != null) {
            this.storage.salvarFunc(funcionario);
            this.route.navigate(['pg-relatorios']);
            alert('Login correto');
          }
        },
        error: () => {
          alert('Funcionário não cadastrado!');
        }
      });
    } else {
      alert('Campos inválidos');
    }
  }
}
