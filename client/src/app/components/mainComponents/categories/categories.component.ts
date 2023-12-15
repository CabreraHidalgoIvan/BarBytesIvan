import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/models';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  listCategorias: Category[] = [];
  gruposCategorias: Category[][] = [];

  constructor(private _menuService: MenuService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this._menuService.getCategories().subscribe(
      data => {
        this.listCategorias = data;
        this.gruposCategorias = []; // Resetea los grupos
        for (let i = 0; i < this.listCategorias.length; i+=5) {
          this.gruposCategorias.push(this.listCategorias.slice(i, i + 5));
          console.log(this.gruposCategorias);
        }
        
      },
      error => {
        console.log(error);
      }
    );
  }


  showDigitalMenu() {
    console.log('Method not implemented.');
    }

}
