import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {

  @Input() view: 'grid' | 'list' = 'grid';

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
