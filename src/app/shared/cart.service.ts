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

    cartPrice = 0;
    shippingCharges = 50;
    orderId:string;
    quantity:number[]=[];
    orders:Product[] = [];

    private uid:string = null;

    // it subscribes to authservice for user data which is widely used in this service to interact with database
    constructor(private afs: AngularFirestore,private authservice :AuthService)
    {
        authservice.user.subscribe(
            (user) => {
                if(user)
                    this.uid = user.uid;
            }
        );
    }

    // it uploads a cart item to cart of the user in database
    uploadItem(quantity:number,id:string)
    {
        this.afs.collection('carts').doc(this.uid).collection('item').doc(JSON.stringify(id)).set({quantity:quantity});
    }

    /* it takes a product as argument and add it to cart with quantity 1
     if it doesn't exist and upload the cart item using uploadItem() method*/
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
            this.uploadItem(1,order.id);
        }
    }

    /* removes item at a given index locally as well as in database it also adjusts the cartPrice
       it nexts the updated cartprice and quantity array for other components to subscribe*/
    removeItem(index:number)
    {
        this.cartPrice-=this.orders[index].price*this.quantity[index];
        this.afs.collection('carts').doc(this.uid).collection('item').doc(JSON.stringify(this.orders[index].id)).delete();
        this.orders.splice(index,1);
        this.cartPriceUpdated.next(this.cartPrice);
        this.quantityUpdated.next(this.quantity);
        this.quantity.splice(index,1);
    }

    /* iterates over every order to calculate cartPrice and nexts them so that other
       components can subscribe to the changes */
    calculateCartPrice()
    {
        if(this.orders.length==0)
        {
            this.cartPriceUpdated.next(0);
            return;
        }
        this.cartPrice=0;
        for(let i=0;i<this.quantity.length;i++)
            this.cartPrice+=(this.quantity[i]*this.orders[i].price);
        this.cartPriceUpdated.next(this.cartPrice)
    }

    // return shipping charges
    getShippingCharges()
    {
        return this.shippingCharges;
    }

    /* it updated the quantity at a given index both locally and in database 
       it uses uploadItem() method to upload the new item with updated quantity
       it also adjusts and sends a cartPrice so that other components can subscribe to the changes*/
    updateQuantity(index:number,newQuantity:number)
    {
        this.uploadItem(newQuantity,this.orders[index].id);
        this.cartPrice-=this.orders[index].price*this.quantity[index];
        this.quantity[index] = newQuantity;
        this.cartPrice+=this.orders[index].price*this.quantity[index];
        this.cartPriceUpdated.next(this.cartPrice);
    }

}