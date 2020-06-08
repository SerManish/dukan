import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[table-row]',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.css']
})
export class CartListItemComponent implements OnInit {

  private maxAllowedQuantity = 6;
  quantityArray = Array(this.maxAllowedQuantity).keys();

  constructor() { }

  ngOnInit(): void {
  }

}
