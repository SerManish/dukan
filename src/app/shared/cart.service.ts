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

    public quantity:number[]=[];
    public orders:Product[] = [];

    private uid:string = null;

    constructor(private afs: AngularFirestore,private authservice :AuthService)
    {
        authservice.user.subscribe(
            (user) => {
                if(user)
                    this.uid = user.uid;
            }
        );
}

    uploadItem(quantity:number,id:string)
    {
        this.afs.collection('carts').doc(this.uid).collection('item').doc(JSON.stringify(id)).set({quantity:quantity});
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
            this.uploadItem(1,order.id);
        }
    }

    removeItem(index:number)
    {
        this.cartPrice-=this.orders[index].price*this.quantity[index];
        this.afs.collection('carts').doc(this.uid).collection('item').doc(JSON.stringify(this.orders[index].id)).delete();
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
        this.uploadItem(newQuantity,this.orders[index].id);
        this.cartPrice-=this.orders[index].price*this.quantity[index];
        this.quantity[index] = newQuantity;
        this.cartPrice+=this.orders[index].price*this.quantity[index];
        this.cartPriceUpdated.next(this.cartPrice);
    }

}