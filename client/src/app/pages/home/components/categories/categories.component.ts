import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BarBytesService } from 'src/app/services/bar-bytes.service';

interface CategoryGroup {
  groupName: string;
  subCategories: string[];
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']

})
export class CategoriesComponent implements OnInit, OnDestroy {

  // Salida al componente padre
  @Output() showCategory = new EventEmitter<string>();

  // Variables
  categories: CategoryGroup[] | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private barBytesService: BarBytesService) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.barBytesService.getAllCategories().subscribe((categories) => {
      this.categories = this.groupCategories(categories);
    });
  }

  private groupCategories(categories: string[]): CategoryGroup[] {
    const categoryGroups: { [key: string]: string[] } = {
      'Entrantes': ['Entrantes', 'Ensaladas'],
      'Principales': ['Carnes', 'Parrilla', 'Pescados', 'Mariscos', 'Vegetarianos'],
      'Comidas Informales': ['Hamburguesas', 'Pizza'],
      'Postres': ['Postres'],
      'Bebidas': ['Bebidas'],
      'Alergias': ['Lactosa', 'Diabetes', 'Gluten', 'Celíacos']
    };
  
    return Object.keys(categoryGroups).map(groupName => ({
      groupName,
      subCategories: categories.filter(category => categoryGroups[groupName].includes(category))
    }));
  }

  // Funciones para filtrar por categorías
  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

}