
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // password visibility
  hide: boolean = true;

  name: string = '';
  password: string  = '';
  role: string = '';
  loading = false;
  error = '';
  constructor(private router: Router, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.loading = true;
    this.authService.login(this.name, this.password)
      .subscribe(
        data => {
          this.loading = false;
          // Redirige al usuario basado en su rol
          this.redirectUser(data.role);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  loginAsGuest() {
    // Lógica para iniciar sesión como invitado
    // Por ejemplo, podrías generar un ID de usuario y número de mesa aleatorios
    const guestId = 'GUEST_' + Math.random().toString(36).substr(2, 9);
    const tableNumber = Math.floor(Math.random() * 100); // Número de mesa aleatorio
    this.authService.loginAsGuest(guestId, tableNumber, this.name).subscribe(data => {
      this.redirectUser(data.role);
    });
  }
  
  onSubscribe() {
    // Lógica para manejar la suscripción, si es necesaria
  }

  redirectUser(role: string) {
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (role === 'waiter') {
      this.router.navigate(['/waiter']);
    } else if (role === 'guest') {
      // Aquí podrías generar un ID de sesión para el invitado y asignar una mesa
      this.router.navigate(['/home']);
    } else {
      // Manejo para roles desconocidos o sin asignar
      this.error = 'Unrecognized role';
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }


}