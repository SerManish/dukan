import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CartService } from '../../../shared/cart.service';
import { Product } from 'src/app/shared/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: '[table-row]',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.css']
})
export class CartListItemComponent implements OnInit,OnDestroy {
  @Input() cartItem:Product;
  @Input() index:number;
  quantity:number;
  total:number;

  quantitySubscription:Subscription;
  quantityArray=[1,2,3,4,5,6];

  constructor(private cartService:CartService) { 

  }
  
  deleteItem()
  {
    this.cartService.removeItem(this.index);
  }

  updatePrice()
  {
    this.cartService.updateQuantity(this.index,this.quantity);
  }

  ngOnInit(): void {
    this.quantity=1;
    this.quantitySubscription = this.cartService.quantityUpdated.subscribe(
      (quantityList) => this.quantity = quantityList[this.index]
    ); 
  }

  ngOnDestroy()
  {
    this.quantitySubscription.unsubscribe();
  }

}
