import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../../shared/cart.service';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: '[table-row]',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.css']
})
export class CartListItemComponent implements OnInit {
  @Input() cartItem:Product;
  @Input() index:number;
  quantity:number;
  total:number;

  quantityArray=[1,2,3,4,5,6];

  constructor(private cartService:CartService) {  
  }
  
  deleteItem()
  {
    this.cartService.removeOrder(this.index);
  }

  updatePrice()
  {
    this.cartService.updateQuantity(this.index,this.quantity);
  }

  ngOnInit(): void {
    this.quantity=1;
  }
}
