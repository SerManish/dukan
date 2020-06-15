import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { take } from 'rxjs/operators';
import { Subscription, BehaviorSubject } from 'rxjs';

import { Product } from 'src/app/shared/product.model';

import { CartService } from '../../shared/cart.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit,OnDestroy {

  cartList:Product[] = [];
  quantityList:number[] = [];
  cartPrice:number = 0;
  shippingCharges:number;
  totalPrice:number;
  uid:string = null;
  userSubscription:Subscription;
  cartPriceSubsription:Subscription;
  isLoading = false;
  userId:string = null;

  itemsReceived = new BehaviorSubject<boolean> (false);
  itemsReceivedSubsription:Subscription;
  constructor(
    private cartService:CartService
    ,private router:Router
    ,private afs: AngularFirestore
    ,private authservice :AuthService
    ) { }

  ngOnInit(): void 
  {
    this.isLoading=true;
    this.shippingCharges = this.cartService.getShippingCharges();
    this.totalPrice = this.cartPrice+this.shippingCharges;
    this.userSubscription = this.authservice.user.subscribe(
      (user) => {
        if(user)
        {
          this.userId = user.uid;
          this.afs.collection('carts').doc(user.uid).collection('item').get().pipe(take(1)).subscribe(
            (snapshot) => 
            {
              this.cartList = [];
              this.quantityList = [];
              this.cartPrice=0;
              snapshot.docs.forEach(
              (doc) => {
                let data = doc.data();
                this.afs.collection('products').doc(doc.id).get().pipe(take(1)).subscribe(
                  (product) => this.cartList.push(<Product>product.data()),
                  (error) => console.log(error),
                  () =>{
                    this.quantityList.push(+data.quantity);
                    this.itemsReceived.next(true);
                  }
                );
              })
              this.itemsReceivedSubsription = this.itemsReceived.subscribe(
                (done) => {
                  if (done)
                  {
                    this.cartService.orders = this.cartList;
                    this.cartService.quantity = this.quantityList;
                    this.cartService.calculateCartPrice();
                    this.cartService.quantityUpdated.next(this.quantityList);
                    this.cartService.cartPriceUpdated.next(this.cartPrice);
                    this.totalPrice = this.shippingCharges+this.cartPrice;
                  }
                }
              );
            },
            (error) => (console).log(error),
            () => this.isLoading=false
          )
        }
      }
    );
    this.cartPriceSubsription = this.cartService.cartPriceUpdated.subscribe(
      (newPrice) => {
        this.cartPrice = newPrice;
        this.totalPrice = this.cartPrice+this.shippingCharges;
      }
    )
    //this.isLoading=false;
  }
  
  checkout()
  {
    let payload = {status:"on the way", products: [],price:this.totalPrice};
    for(let i=0;i<this.cartList.length;i++)
      {
         payload.products.push({name: this.cartList[i].name, quantity: this.quantityList[i]});
      }
    this.afs.collection('orders').doc(this.userId).collection('users-orders').add(payload);

    // Clearing Cart locally and from firebase
    this.cartList = [];
    this.quantityList = [];
    this.cartService.orders = this.cartList;
    this.cartService.quantity = this.quantityList;
    this.afs.collection('carts').doc(this.userId).delete();

    this.router.navigate(['/cart','address']);
  }

  continueShopping()
  {
    this.router.navigate(['/home']);
  }
  
  ngOnDestroy() 
  {
    this.userSubscription.unsubscribe();
    this.cartPriceSubsription.unsubscribe();
    this.itemsReceived.unsubscribe();
  }
}
