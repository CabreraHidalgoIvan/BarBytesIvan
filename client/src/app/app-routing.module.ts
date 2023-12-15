import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';

// Guardianes
import { RoleGuard } from './services/role.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  // Rutas principales
  { path: 'login', component: LoginComponent },                                               // Client + Admin + Employee
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'guest'} },             // Client
  { path: '', redirectTo: '/login', pathMatch: "full" },   // Client

  // Rutas del cliente
  { path: 'cart', component: CartComponent, canActivate: [RoleGuard], data: { role: 'guest'}  },             // Client

  // customPlate                                          // Client
  // EmployeeHome                                         // Employee
  // AdminHome                                            // Admin
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
