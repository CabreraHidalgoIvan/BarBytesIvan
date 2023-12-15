import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dishes } from 'src/app/models/Dishes.model';
import { AuthService } from 'src/app/services/auth.service';
import { BarBytesService } from 'src/app/services/bar-bytes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  // Expansión del sidenav
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  // Barra de búsqueda
  searchResults: Dishes[] = [];
  showDropdown = false;


  constructor(private authService: AuthService, private router: Router, private barBytesService: BarBytesService){}

  // Función para expandir el sideNav
  SideNavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  // Funciones de usuario
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Funciones para filtrar por nombre
  onSearch(term: string): void {
    if (term) {
      this.barBytesService.getAllDishes('3', 'desc', undefined, term).subscribe((dishes: Dishes[]) => {
        this.searchResults = dishes;
        this.showDropdown = true;
      });
    } else {
      this.searchResults = [];
      this.showDropdown = false;
    }
  }

}
