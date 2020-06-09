import { Injectable } from '@angular/core';
import { ProductList } from '../product-list/product-list.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class OrdersService
{
    ordersUpdated = new BehaviorSubject<ProductList[]>(null);
    quantityUpdated = new BehaviorSubject<number[]>(null);
    cartPriceUpdated = new Subject<number>();

    private cartPrice = 0;
    private shippingCharges = 50;
    pricarttotalPrice = 0;

    private quantity:number[]=[1,1,1,1];

    private orders:ProductList[] = [{
        name:"Grapes",
        imagePath:"../../../assets/images/carousal0.jpg",
        description:`Some Description about the item in few words,
        Some Description about the item in few words,
        Some Description about the item in few words
        Some Description about the item in few words`,
        price:29.99,
        isBestSeller: true
      },
      {
        name:"Camera",
        imagePath:"../../../assets/images/carousal1.jpg",
        description:`Some Description about the item in few words,
        Some Description about the item in few words,
        Some Description about the item in few words
        Some Description about the item in few words`,
        price:19999.99,
        isBestSeller: false
      },
      {
        name:"Bananas",
        imagePath:"../../../assets/images/carousal2.jpg",
        description:`Some Description about the item in few words,
        Some Description about the item in few words,
        Some Description about the item in few words
        Some Description about the item in few words`,
        price:109.99,
        isBestSeller: true
      },
      {
        name:"Rich Grapes",
        imagePath:"../../../assets/images/carousal0.jpg",
        description:`Some Description about the item in few words,
        Some Description about the item in few words,
        Some Description about the item in few words
        Some Description about the item in few words`,
        price:2099.99,
        isBestSeller: false
      }
    ]

    getOrders()
    {
        return this.orders.slice();
    }

    getQuantity()
    {
        return this.quantity.slice();
    }

    addOrder(order:ProductList)
    {
        let found = false
        for(let i:number;i<this.orders.length;i++)
        {
            if(this.orders[i].name = order.name)
            {
                this.quantity[i]++;
                found = true;
                break;
            }   
        }
        if(!found)
        {
            this.orders.push(order);
            this.quantity.push(1);
            this.ordersUpdated.next(this.orders);
        }
        this.cartPrice+=order.price;
        this.cartPriceUpdated.next(this.cartPrice);
        this.quantityUpdated.next(this.quantity);
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