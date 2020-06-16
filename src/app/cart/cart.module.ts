import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartListItemComponent } from './cart-list/cart-list-item/cart-list-item.component';
import { AddressComponent } from './address/address.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/auth.guard';
import { SharedModule } from '../shared/shared.module';

const routes:Routes = [
    { path:'',component:CartComponent,
        canActivate: [AuthGuard], 
        children:[
        {path:'cartlist',component:CartListComponent},
        {path:'address',component:AddressComponent},
        {path:'ordersuccess',component:OrderSuccessComponent}
    ]},
]

@NgModule({
    declarations:[
        CartComponent,
        CartListComponent,
        CartListItemComponent,
        AddressComponent,
        OrderSuccessComponent
    ],
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        SharedModule
    ],
    exports:[
        RouterModule
    ]
})
export class CartModule
{}