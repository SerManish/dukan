import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/product-list/product-list.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cartList:ProductList[] = [{
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
