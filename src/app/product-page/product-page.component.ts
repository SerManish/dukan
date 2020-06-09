import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductList } from '../product-list/product-list.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  basicDetails: ProductList = {
    name:"Grapes",
    imagePath:"../../../assets/images/carousal0.jpg",
    description:`Some Description about the item in few words,
    Some Description about the item in few words,
    Some Description about the item in few words
    Some Description about the item in few words`,
    price:29.99,
    isBestSeller: true
  } 

  product: Product = {
    basicDetails: this.basicDetails,
    details: [
      {detailType:'Size', detailDesc:'10x10'},
      {detailType:'Battery', detailDesc:'10000 mah'},
      {detailType:'Colour', detailDesc:'Yellow'},
      {detailType:'RAM', detailDesc:'16GB'},
      {detailType:'Size', detailDesc:'10x10'},
      {detailType:'Battery', detailDesc:'10000 mah'},
      {detailType:'Colour', detailDesc:'Yellow'},
      {detailType:'RAM', detailDesc:'16GB'},
      {detailType:'Size', detailDesc:'10x10'},
      {detailType:'Battery', detailDesc:'10000 mah'},
      {detailType:'Colour', detailDesc:'Yellow'},
      {detailType:'RAM', detailDesc:'16GB'},
      {detailType:'Size', detailDesc:'10x10'}
    ]
  } ;

  constructor() { }

  ngOnInit(): void {
  }

}
