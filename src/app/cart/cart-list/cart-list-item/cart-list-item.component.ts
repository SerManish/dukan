import { Component, OnInit, Input } from '@angular/core';
import { ProductList } from 'src/app/product-list/product-list.modal';

@Component({
  selector: '[table-row]',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.css']
})
export class CartListItemComponent implements OnInit {
  @Input() cartItem:ProductList;
  private maxAllowedQuantity = 6;
  quantityArray = Array(this.maxAllowedQuantity).keys();

  constructor() { }

  ngOnInit(): void {
  }

}
