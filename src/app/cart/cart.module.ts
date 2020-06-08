import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';
import { AddressComponent } from './address/address.component';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CommonModule } from '@angular/common';

const routes:Routes = [
    { path:'cart',component:CartComponent, children:[
        {path:'cartlist',component:CartListComponent},
        {path:'address',component:AddressComponent},
        {path:'paymentmode',component:PaymentModeComponent},
        {path:'ordersuccess',component:OrderSuccessComponent}
    ]},
]

@NgModule({
    declarations:[
        CartComponent,
        CartListComponent,
        CartListItemComponent,
        AddressComponent,
        PaymentModeComponent,
        OrderSuccessComponent
    ],
    imports:[
        RouterModule.forChild(routes),
        CommonModule
    ],
    exports:[
        RouterModule
    ]
})
export class CartModule
{}