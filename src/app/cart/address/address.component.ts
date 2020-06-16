import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CartService } from 'src/app/shared/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @ViewChild('f') addressForm;
  userSubscription:Subscription;
  constructor(
    private router:Router,
    private authService:AuthService,
    private afs : AngularFirestore,
    private cartService:CartService
    ) { }

  ngOnInit(): void {
  }
  
  onSubmit()
  {
    this.userSubscription  = this.authService.user.subscribe(
      async (user) =>
      {
        if(user)
        {
          let payload = {status:"Order Received", products: [],price:this.cartService.cartPrice};
          for(let i=0;i<this.cartService.orders.length;i++)
            {
              payload.products.push({name: this.cartService.orders[i].name, quantity: this.cartService.quantity[i]});
            }
          this.afs.collection('orders').doc(user.uid).set({paid:true});
          let response = await this.afs.collection('orders').doc(user.uid).collection('users-orders').add(payload);
          this.cartService.orderId = response.id;
          // Clearing Cart locally and from firebase
          this.afs.collection('carts').doc(user.uid).collection('item').get().subscribe(
            (snapshot) =>
            {
              snapshot.docs.forEach(
                (doc) =>
                {
                  this.afs.collection('carts').doc(user.uid).collection('item').doc(doc.id).delete();
                }
              )
            }
          );
          this.afs.collection('carts').doc(user.uid).delete();
          this.cartService.orders = [];
          this.cartService.quantity=[];
          this.cartService.cartPrice=0;
          this.router.navigate(['/cart','ordersuccess']);
        }
      }
    )
  }
}
