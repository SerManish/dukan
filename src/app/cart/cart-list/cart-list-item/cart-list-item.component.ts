import { Component, OnInit, Input } from '@angular/core';
import { ProductList } from 'src/app/shared/product-list.model';
import { OrdersService } from '../../orders.service';

@Component({
  selector: '[table-row]',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.css']
})
export class CartListItemComponent implements OnInit {
  @Input() cartItem:ProductList;
  @Input() index:number;
  quantity:number;
  total:number;

  quantityArray=[1,2,3,4,5,6];

  constructor(private orderService:OrdersService) {  
  }
  
  deleteItem()
  {
    this.orderService.removeOrder(this.index);
  }

  updatePrice()
  {
    this.orderService.updateQuantity(this.index,this.quantity);
  }

  ngOnInit(): void {
    this.quantity=1;
  }
}
