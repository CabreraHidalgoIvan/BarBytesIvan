import { Component, OnInit } from '@angular/core';
import { SuggestedProduct } from 'src/app/models/models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  // suggestedProducts: SuggestedProduct[] = [
  //   {
  //     banerimage: 'assets/images/baner1.jpg',
  //     category: {
  //       id: 1,
  //       category: 'Pizza',
  //       subcategory: 'Italian'
  //     }
  //   }
  // ];
  constructor() {}

  ngOnInit(): void {
  }

}
