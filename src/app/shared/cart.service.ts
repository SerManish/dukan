import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from './product.model';

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
    pricarttotalPrice = 0;

    private quantity:number[]=[];

    private orders:Product[] = [];
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