import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from './product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
    providedIn:'root'
})
export class CartService
{
    ordersUpdated = new BehaviorSubject<Product[]>(null);
    quantityUpdated = new BehaviorSubject<number[]>(null);
    cartPriceUpdated = new Subject<number>();

    private cartPrice = 0;
    private shippingCharges = 50;

    private quantity:number[]=[];
    private orders:Product[] = [];

    private uid:string = null;

    constructor(private afs: AngularFirestore,private authservice :AuthService)
    {
        authservice.user.subscribe(
            (user) => {
                if(user)
                    this.uid = user.uid;
            }
        );
    //     afs.collection('carts').doc('XhZZdtraIncGqfYNnDWR').collection('item').get().subscribe(
    //         (snapshot) => snapshot.docs.forEach(
    //             (doc) => console.log(doc.data())
    //         )
    //     )
    //    afs.collection('carts').doc('XhZZdtraIncGqfYNnDWR').collection('item').doc('65CmbpWp3PQQfdX79zSv').update({id:1212});
    this.authservice.user.subscribe(
        (user) => {
            if(user)
            {
              this.afs.collection('carts').doc(user.uid).collection('item').get().subscribe(
                  (snapshot) => 
                  {
                    this.orders = [];
                    snapshot.docs.forEach(
                    (doc) => {
                        let data = doc.data()
                        this.orders.push(new Product(data.id,data.category,data.name,data.imagePath,data.shortDescription,data.longDescription,data.price,data.details,data.isBestSeller));
                    }
                    )
                    this.ordersUpdated.next(this.orders);
                  }
              )
            }
        }
      );

}

    uploadItem(order:Product)
    {
        this.afs.collection('carts').doc(this.uid).collection('item').add(order);
    }

    getOrders()
    {
        return this.orders.slice();
    }

    getQuantity()
    {
        return this.quantity.slice();
    }

    addToCart(order:Product)
    {
        let found = false;
        for(let i=0;i<this.orders.length;i++)
        {
            if(this.orders[i].id == order.id)
            {
                found = true;
                break;
            }   
        }
        if(!found)
        {
            this.orders.push(order);
            this.quantity.push(1);
            this.ordersUpdated.next(this.orders);
            this.quantityUpdated.next(this.quantity);
            this.uploadItem(order);
        }
    }

    removeOrder(index:number)
    {
        this.cartPrice-=this.orders[index].price*this.quantity[index];
        this.orders.splice(index,1);
        this.quantity.splice(index,1);
        this.cartPriceUpdated.next(this.cartPrice);
        this.ordersUpdated.next(this.orders);
        this.quantityUpdated.next(this.quantity);
    }

    calculateCartPrice()
    {
        if(this.orders.length==0)
            return 0;
        this.cartPrice=0;
        for(let i=0;i<this.quantity.length;i++)
            this.cartPrice+=(this.quantity[i]*this.orders[i].price);
        return this.cartPrice;
    }

    getShippingCharges()
    {
        return this.shippingCharges;
    }

    updateQuantity(index:number,newQuantity:number)
    {
        this.cartPrice-=this.orders[index].price*this.quantity[index];
        this.quantity[index] = newQuantity;
        this.cartPrice+=this.orders[index].price*this.quantity[index];
        this.cartPriceUpdated.next(this.cartPrice);
    }

}