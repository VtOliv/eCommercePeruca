import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ProdutosGeralComponent } from './components/produtos-geral/produtos-geral.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: "home", component: HomeComponent },
  { path: 'produtosgeral', component: ProdutosGeralComponent },
  { path: "carrinho" , component: CarrinhoComponent},
  { path: '**', redirectTo: 'home'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }