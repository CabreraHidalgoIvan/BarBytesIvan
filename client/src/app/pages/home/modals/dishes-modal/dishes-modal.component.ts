import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dishes } from 'src/app/models/Dishes.model';



@Component({
  selector: 'app-dishes-modal',
  templateUrl: './dishes-modal.component.html',
  styleUrls: ['./dishes-modal.component.css']
})
export class DishesModalComponent implements OnInit {
  CATEGORY_CUSTOMIZATIONS = {
    'Carnes': {
        cookingOptions: ['Bien hecha', 'Al punto', 'Poco hecha']
        // ... otras opciones específicas de 'Carnes'
    },
    'Ensaladas': {
        sauces: ['Ketchup', 'Mostaza', 'Mayonesa'],
        extras: ['Pepinillo', 'Queso extra']
        // ... otras opciones específicas de 'Hamburguesas'
    },
    // ... otras categorías
  };

  customization = {
    cookingPoint: '',
    salsas: {
      ketchup: false,
      mostaza: false,
      mayonesa: false
    }
  };


  constructor(@Inject(MAT_DIALOG_DATA) public data: { dish: Dishes },
  private dialogRef: MatDialogRef<DishesModalComponent>) {
    console.log(data.dish.category);
   }

  ngOnInit(): void {
  }

  confirmCustomization() {
    // Procesa las personalizaciones aquí
    const personalizedDish = {
        ...this.data.dish,
        customization: this.customization
    };

    this.dialogRef.close(personalizedDish);
  }

  isCategory(categoryName: string): boolean {
    return this.data.dish.category.includes(categoryName);
  }
}
