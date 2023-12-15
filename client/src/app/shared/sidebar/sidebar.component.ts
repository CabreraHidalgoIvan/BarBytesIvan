import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit{

  name: string = '';

  list: any[] = [];

  @Input() sideNavStatus: boolean = false;

  // list = [
  //   {number: '1', name: 'Menu', icon: 'fa-solid fa-house', href: ''},
  //   {number: '2', name: 'Cart', icon: 'fa-solid fa-cart-shopping', href: 'cart'},
  // ]
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authService.currentUser.subscribe(user => {
      this.name = user ?  user.name : 'Guest';

      if (user) {
        this.name = user.name;
        this.adjustNavItems(user.role); // Ajustar los elementos del nav según el rol
      } else {
        this.name = 'Guest';
        // Ajustar para invitados o estado por defecto
        this.adjustNavItems('guest');
      }
    });
    
  }

  adjustNavItems(role: string) {
    switch (role) {
      case 'admin':
        // Define los enlaces para el administrador
        this.list = [
          // Enlaces específicos para admin
        ];
        break;
      case 'waiter':
        // Define los enlaces para el camarero
        this.list = [
          // Enlaces específicos para waiter
        ];
        break;
      case 'guest':
        // Define los enlaces para clientes (guest)
        this.list = [
          { number: '1', name: 'Menu', icon: 'fa-solid fa-house', href: '/home' },
          { number: '2', name: 'Cart', icon: 'fa-solid fa-cart-shopping', href: '/cart' },
        ];
        break;
    }

  }


  navigate(url: string) {
    this.router.navigate([url]);
}

}
