import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// Routes (Você deve exportar uma const 'routes' do seu arquivo de rotas)
import { routes } from './app.routes';

// Providers de Serviços
import { MessageService, ConfirmationService } from 'primeng/api';
import { provideNgxMask } from 'ngx-mask';

// Modulos que ainda exigem .forRoot() ou não possuem provide direto
import { NbThemeModule } from '@nebular/theme';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    // Roteamento
    provideRouter(routes, withComponentInputBinding()),
    
    // Core e Animações
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),

    // Configurações de Bibliotecas (Modos de compatibilidade)
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'default' }),
      ModalModule.forRoot(),
      NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
    ),

    // Providers Globais
    provideNgxMask(),
    MessageService,
    ConfirmationService
  ]
};