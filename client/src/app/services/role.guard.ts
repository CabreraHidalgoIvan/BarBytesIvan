import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.currentUser.pipe(
      map(user => {
        // Usa la sintaxis de corchetes para acceder a la propiedad 'role'
        const userRole = user ? user['role'] as 'admin' | 'waiter' | 'guest' : null;
        if (userRole && userRole === route.data['role']) {
          return true;
          console.log(userRole);
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
