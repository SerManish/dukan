import { Component, OnInit } from '@angular/core';
import { ProductList } from './product-list.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchResult:ProductList[] = [{
    name:"Grapes",
    imagePath:"../../../assets/images/carousal0.jpg",
    description:`Some Description about the item in few words,
    Some Description about the item in few words,
    Some Description about the item in few words
    Some Description about the item in few words`,
    price:29.99,
    isBestSeller: true
  },
  {
    name:"Camera",
    imagePath:"../../../assets/images/carousal1.jpg",
    description:`Some Description about the item in few words,
    Some Description about the item in few words,
    Some Description about the item in few words
    Some Description about the item in few words`,
    price:19999.99,
    isBestSeller: false
  },
  {
    name:"Bananas",
    imagePath:"../../../assets/images/carousal2.jpg",
    description:`Some Description about the item in few words,
    Some Description about the item in few words,
    Some Description about the item in few words
    Some Description about the item in few words`,
    price:109.99,
    isBestSeller: true
  },
  {
    name:"Rich Grapes",
    imagePath:"../../../assets/images/carousal0.jpg",
    description:`Some Description about the item in few words,
    Some Description about the item in few words,
    Some Description about the item in few words
    Some Description about the item in few words`,
    price:2099.99,
    isBestSeller: false
  }
]

  constructor() { }
  
  ngOnInit(): void {
  }

}
