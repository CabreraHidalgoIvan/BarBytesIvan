import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dishes } from 'src/app/models/Dishes.model';
import { DishesModalComponent } from '../../modals/dishes-modal/dishes-modal.component';

@Component({
  selector: 'app-dishes-box',
  templateUrl: './dishes-box.component.html',
  styleUrls: ['./dishes-box.component.css']
})
export class DishesBoxComponent implements OnInit {


  @Input() fullWidthMode = false;

  @Input() dishes: Dishes | undefined;

  @Output() addToCart = new EventEmitter();
  

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.dishes);
  }

  onAddToCart() {
    this.addToCart.emit(this.dishes);
  }

  openDishesModal(dish: Dishes) {
    console.log('DISHES', dish);
    // Abre el modal con las opciones de personalización
    // Necesitarás pasar 'dish' al modal para mostrar sus detalles y opciones
    const dialogRef = this.dialog.open(DishesModalComponent, {
      width: '60%',
      data: { dish: dish }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario confirmó las personalizaciones
        // 'result' contiene el objeto 'dish' modificado
        // Puedes añadirlo al carrito o tomar otras acciones
        console.log('Personalizaciones confirmadas:', result);
        this.addToCart.emit(result);
      }
    });
  }
}
