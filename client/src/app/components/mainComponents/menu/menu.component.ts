import { Component, OnInit } from '@angular/core';
import { Category, Dish } from 'src/app/models/models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  categories: Category[] = [];
  selectedCategory?: Category;
  dishes: Dish[] = [];

  onSelectedCategory(category: Category) {
    this.selectedCategory = category;

  }

  constructor() {}

  ngOnInit(): void {
  }

}
