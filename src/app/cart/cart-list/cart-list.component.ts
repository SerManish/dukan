import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../shared/cart.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit,OnDestroy {

  cartList:Product[];
  cartListSubscription :Subscription;
  quantityList:number[];
  quantityListSubscription :Subscription;
  cartPrice:number;
  cartPriceSubscription :Subscription;
  shippingCharges:number;
  totalPrice:number;
  uid:string = null;

  constructor(private cartService:CartService,private router:Router,private afs: AngularFirestore,private authservice :AuthService) { }

  ngOnInit(): void 
  {
    this.cartList = this.cartService.getOrders();
    this.quantityList = this.cartService.getQuantity();
    this.cartPrice = this.cartService.calculateCartPrice();
    this.shippingCharges = this.cartService.getShippingCharges();
    this.totalPrice = this.cartPrice+this.shippingCharges;
    this.cartListSubscription = this.cartService.ordersUpdated.subscribe(
      (newProductList:Product[]) => 
      {
        if(newProductList)
          this.cartList = newProductList;
      }
    );
    this.quantityListSubscription = this.cartService.quantityUpdated.subscribe(
      (newQuantityList:number[]) =>
      {
        if(newQuantityList)
          this.quantityList = newQuantityList;
      }
    );
    this.cartListSubscription = this.cartService.cartPriceUpdated.subscribe(
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
