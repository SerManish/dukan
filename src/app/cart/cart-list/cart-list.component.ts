import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ProductList } from 'src/app/shared/product-list.model';
import { OrdersService } from '../orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit,OnDestroy {

  cartList:ProductList[];
  cartListSubscription :Subscription;
  quantityList:number[];
  quantityListSubscription :Subscription;
  cartPrice:number;
  cartPriceSubscription :Subscription;
  shippingCharges:number;
  totalPrice:number;

  constructor(private orderService:OrdersService,private router:Router) { }

  ngOnInit(): void 
  {
    this.cartList = this.orderService.getOrders();
    this.quantityList = this.orderService.getQuantity();
    this.cartPrice = this.orderService.calculateCartPrice();
    this.shippingCharges = this.orderService.getShippingCharges();
    this.totalPrice = this.cartPrice+this.shippingCharges;
    this.cartListSubscription = this.orderService.ordersUpdated.subscribe(
      (newProductList:ProductList[]) => 
      {
        if(newProductList)
          this.cartList = newProductList;
      }
    );
    this.quantityListSubscription = this.orderService.quantityUpdated.subscribe(
      (newQuantityList:number[]) =>
      {
        if(newQuantityList)
          this.quantityList = newQuantityList;
      }
    );
    this.cartListSubscription = this.orderService.cartPriceUpdated.subscribe(
      (newCartPrice:number) =>
      {
        this.cartPrice = newCartPrice;
        this.totalPrice = this.cartPrice+this.shippingCharges;
      }
    );
  }
  
  checkout()
  {
    this.router.navigate(['/cart','address']);
  }

  continueShopping()
  {
    this.router.navigate(['/home']);
  }
  
  ngOnDestroy() 
  {
    this.cartListSubscription.unsubscribe();
    this.quantityListSubscription.unsubscribe();
    this.cartListSubscription.unsubscribe();
  }
}
