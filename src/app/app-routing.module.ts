import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './components/login/login.component'
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { QuemSomosComponent } from './components/quem-somos/quem-somos.component';

const routes: Routes = [
  { path: '', redirectTo: 'checkout', pathMatch: 'full'},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'login', component: LoginComponent },
  { path: 'quemSomos', component: QuemSomosComponent }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
