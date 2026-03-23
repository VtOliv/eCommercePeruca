import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'checkout', 
    loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent),
    runGuardsAndResolvers: 'always' 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'cadastre-se', 
    loadComponent: () => import('./components/cadastro/cadastro.component').then(m => m.CadastroComponent) 
  },
  { 
    path: 'contato', 
    loadComponent: () => import('./components/contato/contato.component').then(m => m.ContatoComponent) 
  },
  { 
    path: 'quem-somos', 
    loadComponent: () => import('./components/quem-somos/quem-somos.component').then(m => m.QuemSomosComponent) 
  },
  { 
    path: 'produto/:id', 
    loadComponent: () => import('./components/pagina-produto/pagina-produto.component').then(m => m.PaginaProdutoComponent) 
  },
  { 
    path: 'carrinho', 
    loadComponent: () => import('./components/pagina-carrinho/pagina-carrinho.component').then(m => m.PaginaCarrinhoComponent) 
  },
  { 
    path: 'finalizar-compra', 
    loadComponent: () => import('./components/compra-finalizada/compra-finalizada.component').then(m => m.CompraFinalizadaComponent) 
  },
  { 
    path: 'catalogo', 
    loadComponent: () => import('./components/catalogo/catalogo.component').then(m => m.CatalogoComponent) 
  },
  { 
    path: 'pagina-institucional', 
    loadComponent: () => import('./components/pagina-institucional/pagina-institucional.component').then(m => m.PaginaInstitucionalComponent) 
  },
  { 
    path: 'historico-pedidos', 
    loadComponent: () => import('./components/historico-pedidos/historico-pedidos.component').then(m => m.HistoricoPedidosComponent) 
  },
  { 
    path: 'checkout-doacao', 
    loadComponent: () => import('./components/checkout-doacao/checkout-doacao.component').then(m => m.CheckoutDoacaoComponent) 
  },
  { 
    path: 'funcionario', 
    loadComponent: () => import('./components/funcionarios/funcionarios.component').then(m => m.FuncionariosComponent) 
  },
  { 
    path: 'pg-relatorios', 
    loadComponent: () => import('./components/pagina-relatorios/pagina-relatorios.component').then(m => m.PaginaRelatoriosComponent) 
  },
  { 
    path: 'relatorios', 
    loadComponent: () => import('./components/pagina-relatorios/relatorios/relatorios.component').then(m => m.RelatoriosComponent) 
  },
  { 
    path: 'cupons', 
    loadComponent: () => import('./components/pagina-relatorios/cupons/cupons.component').then(m => m.CuponsComponent) 
  },
  { 
    path: 'estoque', 
    loadComponent: () => import('./components/pagina-relatorios/estoque/estoque.component').then(m => m.EstoqueComponent) 
  },
  { 
    path: 'recuperar-senha', 
    loadComponent: () => import('./components/recuperar-senha/recuperar-senha.component').then(m => m.RecuperarSenhaComponent) 
  },
  { 
    path: 'login-relatorio', 
    loadComponent: () => import('./components/pagina-relatorios/login-relatorios/login-relatorios.component').then(m => m.LoginRelatoriosComponent) 
  },
  { 
    path: 'painel-fale-conosco', 
    loadComponent: () => import('./components/pagina-relatorios/painel-fale-conosco/painel-fale-conosco.component').then(m => m.PainelFaleConoscoComponent) 
  }
];