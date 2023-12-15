import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/Cart.model';
import { Dishes } from 'src/app/models/Dishes.model';
import { BarBytesService } from 'src/app/services/bar-bytes.service';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 450,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  cols = 3; // 3 columns by default

  category: Array<{ _id: string; nombre: string; }> = [];

  rowHeight = ROWS_HEIGHT[this.cols]; // if cols = 3, rowHeight = 335

  //Dinamización del carrito
  itemsQuantity = 0;

  //Dinamización de los platos
  dishes: Array<Dishes> | undefined;
  sort = 'desc';
  count = '12';
  dishesSubscription: Subscription | undefined;


  constructor(private _cartService: CartService, private router: Router, private barBytesService: BarBytesService) { }

  ngOnInit(): void {
    this.dishesSubscription = this._cartService.cart.subscribe(cart => {
      this.itemsQuantity = cart.items.map(item => item.quantity).reduce((prev, next) => prev + next, 0);
    });

    this.getDishes();

  }

  getDishes(): void {
    this.dishesSubscription = this.barBytesService.getAllDishes(this.count, this.sort, this.category).subscribe((_dishes) => {
      console.log(_dishes);
      this.dishes = _dishes;
    });
  }

  // Funciones para cambiar el número de columnas
  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  // Funciones para filtrar por categorías
  onShowCategory($event: string) {
    this.category = [{ _id: '', nombre: $event }];
    this.getDishes();
  }

  // FUNCIONES CARRITO

  // 1. Funcion para agregar al carrito
  onAddToCart(dishes: Dishes) {
    this._cartService.addToCart({
      product: dishes.image,
      name: dishes.title,
      price: dishes.price,
      quantity: 1,
      id: dishes.id
    });

    console.log(dishes);
  }

  // 2. Funcion para ir al carrito
  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  // 3. Funcion para obtener el total de productos
  getTotal(items: Array<CartItem>): number {
    return this._cartService.getTotal(items);
  }

  // 4. Funcion para limpiar el carrito
  onClearCart(): void {
    this._cartService.clearCart();
  }

  ngOnDestroy(): void {
    if (this.dishesSubscription) {
      this.dishesSubscription.unsubscribe();
    }
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getDishes();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getDishes();
  }
}
