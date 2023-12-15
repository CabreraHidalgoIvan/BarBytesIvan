import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { loadStripe } from '@stripe/stripe-js';

// Import the Cart interface
import { Cart, CartItem } from 'src/app/models/Cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
    cart: Cart = { items: [] };

    dataSource: Array<CartItem> = [];

    displayedColumns: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'actions'];

    constructor(private cartService: CartService, private http: HttpClient) { }
  
    ngOnInit(): void {
      this.cartService.cart.subscribe(_cart => {
        this.cart = _cart;
        this.dataSource = this.cart.items;
        console.log(this.dataSource);
        console.log(this.cart.items);
      });
    }

    getTotal(items: Array<CartItem>): number {
      return this.cartService.getTotal(items);
    }

    onClearCart(): void {
      this.cartService.clearCart();
    }

    onRemoveFromCart(item: CartItem): void {
      this.cartService.removeFromCart(item);
    }

    onAddQuantity(item: CartItem): void {
      this.cartService.addToCart(item);
    }

    onRemoveQuantity(item: CartItem): void {
      this.cartService.removeQuantity(item);
    }

    onCheckout(): void {
      this.http.post('http://localhost:4000/checkout', {
        items: this.cart.items
      }).subscribe(async (res: any) => {
        let stripe = await loadStripe('pk_test_51OKb8xIFKAgZXg8b3kCgGsExtL5aNQcp2BxQrWit30WAX3qoaTQPUxaqSdhVXnDBLahJ2snFTH24Gw2I4zdG7yhz00O4AqTq1v');
        stripe?.redirectToCheckout({
          sessionId: res.id
        });
      });
    }
}