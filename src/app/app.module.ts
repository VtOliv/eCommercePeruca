import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NbThemeModule, NbStepperModule } from "@nebular/theme";
import { MatSidenavModule } from '@angular/material/sidenav';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';
import {ToastModule} from 'primeng/toast';
import { NgxSpinnerModule } from "ngx-spinner";
import {ButtonModule} from 'primeng/button';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ContatoComponent } from './components/contato/contato.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {FileUploadModule} from 'primeng/fileupload';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { DadosPagamentoComponent } from './components/checkout/dados-pagamento/dados-pagamento.component';
import { NavCheckoutComponent } from './components/checkout/nav-checkout/nav-checkout.component';
import { CadastroEnderecoComponent } from './components/cadastro-endereco/cadastro-endereco.component';
import { EnderecoComponent } from './components/checkout/endereco/endereco.component';
import { FormaEnvioComponent } from './components/checkout/forma-envio/forma-envio.component';
import { CarrinhoComponent } from './components/checkout/carrinho/carrinho.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { QuemSomosComponent } from "./components/quem-somos/quem-somos.component";
import { ConteudoComponent } from "./components/quem-somos/conteudo/conteudo.component";
import { DescricaoComponent } from "./components/quem-somos/descricao/descricao.component";
import { ModalComponent } from "./components/quem-somos/modal/modal.component";
import { NavbarComponent } from "./components/quem-somos/navbar/navbar.component";
import { SobreComponent } from "./components/quem-somos/sobre/sobre.component";
import { PaginaProdutoComponent } from "./components/pagina-produto/pagina-produto.component";
import { CarrosselComponent } from "./components/pagina-produto/carrossel/carrossel.component";
import { ComprarComponent } from "./components/pagina-produto/comprar/comprar.component";
import { HomeComponent } from "./components/home/home.component";
import { CarroselHomeComponent } from "./components/home/carrosel-home/carrosel-home.component";
import { InstitucionalComponent } from "./components/home/institucional/institucional.component";
import { MaisVendidosComponent } from "./components/home/mais-vendidos/mais-vendidos.component";
import { PaginaCarrinhoComponent } from './components/pagina-carrinho/pagina-carrinho.component';
import { CardComponent } from './components/pagina-carrinho/card/card.component';
import { CompraFinalizadaComponent } from './components/compra-finalizada/compra-finalizada.component';
import { CentroComponent } from './components/compra-finalizada/centro/centro.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ProdutoComponent } from './components/catalogo/produto/produto.component';
import { CategoriaComponent } from './components/catalogo/categoria/categoria.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { PaginaInstitucionalComponent } from './components/pagina-institucional/pagina-institucional.component';
import { ComoDoarComponent } from './components/pagina-institucional/como-doar/como-doar.component';
import { EscolhaPerucaComponent } from './components/pagina-institucional/escolha-peruca/escolha-peruca.component'
import { CarrosselDoacaoComponent } from './components/pagina-institucional/carrossel-doacao/carrossel-doacao.component';
import { HistoricoPedidosComponent } from './components/historico-pedidos/historico-pedidos.component';
import { ListaPedidosComponent } from './components/historico-pedidos/lista-pedidos/lista-pedidos.component';
import { CheckoutDoacaoComponent } from './components/checkout-doacao/checkout-doacao.component';
import { PaginaRelatoriosComponent } from './components/pagina-relatorios/pagina-relatorios.component';
import { CuponsComponent } from './components/pagina-relatorios/cupons/cupons.component';
import { EstoqueComponent } from './components/pagina-relatorios/estoque/estoque.component';
import { ReclamacoesComponent } from './components/pagina-relatorios/reclamacoes/reclamacoes.component';
import { RelatoriosComponent } from './components/pagina-relatorios/relatorios/relatorios.component';
import { NavRelatoriosComponent } from './components/pagina-relatorios/nav-relatorios/nav-relatorios.component';
import { DetalhesPedidoComponent } from './components/historico-pedidos/detalhes-pedido/detalhes-pedido.component';
import { FinalizarDoacaoComponent } from './components/checkout-doacao/finalizar-doacao/finalizar-doacao.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { ProgressoPedidoComponent } from './components/historico-pedidos/progresso-pedido/progresso-pedido.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProdutosRecomendadosComponent } from './components/pagina-produto/produtos-recomendados/produtos-recomendados.component';
import { LoginRelatoriosComponent } from './components/pagina-relatorios/login-relatorios/login-relatorios.component';
import { MenuRelatoriosComponent } from './components/pagina-relatorios/menu-relatorios/menu-relatorios.component';
import { CadastroProdutoComponent } from './components/pagina-relatorios/estoque/cadastro-produto/cadastro-produto.component';
import { AlterarProdutoComponent } from './components/pagina-relatorios/estoque/alterar-produto/alterar-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarroselHomeComponent,
    InstitucionalComponent,
    MaisVendidosComponent,
    PaginaProdutoComponent,
    CarrosselComponent,
    ComprarComponent,
    DescricaoComponent,
    ModalComponent,
    NavbarComponent,
    SobreComponent,
    LoginComponent,
    ContatoComponent,
    CheckoutComponent,
    DadosPagamentoComponent,
    NavCheckoutComponent,
    CadastroEnderecoComponent,
    EnderecoComponent,
    FormaEnvioComponent,
    CarrinhoComponent,
    CadastroComponent,
    FooterComponent,
    HeaderComponent,
    QuemSomosComponent,
    ConteudoComponent,
    PaginaCarrinhoComponent,
    CardComponent,
    CompraFinalizadaComponent,
    CentroComponent,
    CatalogoComponent,
    ProdutoComponent,
    CategoriaComponent,
    FuncionariosComponent,
    PaginaInstitucionalComponent,
    ComoDoarComponent,
    EscolhaPerucaComponent,
    CarrosselDoacaoComponent,
    HistoricoPedidosComponent,
    ListaPedidosComponent,
    CheckoutDoacaoComponent,
    PaginaRelatoriosComponent,
    CuponsComponent,
    EstoqueComponent,
    ReclamacoesComponent,
    RelatoriosComponent,
    NavRelatoriosComponent,
    DetalhesPedidoComponent,
    FinalizarDoacaoComponent,
    RecuperarSenhaComponent,
    ProgressoPedidoComponent,
    ProdutosRecomendadosComponent,
    LoginRelatoriosComponent,
    MenuRelatoriosComponent,
    CadastroProdutoComponent,
    AlterarProdutoComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot(),
    NbStepperModule,
    MatSidenavModule,
    InputSwitchModule,
    NbStepperModule,
    TableModule,
    DialogModule,
    ToastModule,
    FileUploadModule,
    NgxSpinnerModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
