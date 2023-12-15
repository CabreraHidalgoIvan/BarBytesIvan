import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/models';

@Component({
  selector: 'app-carousel-dishes',
  templateUrl: './carousel-dishes.component.html',
  styleUrls: ['./carousel-dishes.component.css']
})
export class CarouselDishesComponent implements OnInit {

  // @Input() category: Category = {id: 0, category: '', subcategory: ''};

  // @Input() count: number = 3;

  @Input() dishes: any[] = [
    {
      name: 'Pizza Margherita',
      price: 5.99,
      rating: 4.5,
      image: 'assets/images/pizza1.jpg'
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

}