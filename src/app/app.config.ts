import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// Routes
import { routes } from './app.routes';

// Providers de Serviços
import { MessageService, ConfirmationService } from 'primeng/api';
import { provideNgxMask } from 'ngx-mask';

// Módulos que exigem .forRoot()
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    // Roteamento
    provideRouter(routes, withComponentInputBinding()),

    // Core e Animações
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),

    // Configurações de Bibliotecas
    importProvidersFrom(
      ModalModule.forRoot(),
      NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
    ),

    // Providers Globais
    provideNgxMask(),
    MessageService,
    ConfirmationService
  ]
};