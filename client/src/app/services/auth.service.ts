import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, tap } from 'rxjs';
import { map} from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'waiter' | 'guest';
  tableNumber?: number; // Solo para invitados
}


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  // Propiedad privada para almacenar el usuario actual
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) { 
// Comprueba si hay un valor en localStorage y, si no, utiliza null.
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') ?? 'null'));

    this.currentUser = this.currentUserSubject.asObservable();
  }


  // Funciones de login y logout
  login(email: string, password: string) {
    return this.http.post<any>(`/api/login`, { email, password })
      .pipe(map(user => {
        // Almacena los detalles del usuario y el token jwt en el almacenamiento local
        // para mantener al usuario logueado entre actualizaciones de página
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // Elimina al usuario del almacenamiento local y establece el valor actual en null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Función para iniciar sesión como invitado
  loginAsGuest(guestId: string, tableNumber: number, name: string) {
    // Crear un objeto de usuario invitado
    const guestUser: User = {
      id: guestId,
      name: name ? name : 'Guest',
      role: 'guest',
      tableNumber: tableNumber
    };
    
    // Simula una respuesta del servidor como si fuera un login
    return of(guestUser).pipe(
      delay(1000), // Simula una llamada de red
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  // Funciones para obtener el usuario actual de forma asíncrona
  get currentUserValue(): User | null {

    return this.currentUserSubject.value;
  }
}
