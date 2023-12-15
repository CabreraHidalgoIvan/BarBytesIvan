import { Component, OnInit } from '@angular/core';
import { Cart } from './models/Cart.model';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  sideNavStatus: boolean = false;

  cart: Cart = { items: [] };

  isLoggedIn: boolean = false;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router){
    this.checkUserSession();
  }

  ngOnInit(){
    // Autenticación de usuario
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });

    // Obtener el carrito
    this.cartService.cart.subscribe(_cart => this.cart = _cart);
  }

  // Funciones Permisos de usuario
  checkUserSession() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      switch (currentUser.role) {
        case 'admin':
          // Asumiendo que tienes una ruta para el admin
          this.router.navigate(['/admin-dashboard']);
          break;
        case 'waiter':
          // Asumiendo que tienes una ruta para los camareros
          this.router.navigate(['/waiter-dashboard']);
          break;
        case 'guest':
          // Para invitados, redirige a la página principal
          this.router.navigate(['/home']);
          break;
        default:
          // En caso de que el rol no coincida, redirige al login
          this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']); // Si no hay usuario, redirige al login
    }
  }

}
