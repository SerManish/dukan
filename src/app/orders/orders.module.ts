import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';

const routes:Routes = [
    {path:'orders',component: OrdersComponent}
]

@NgModule({
    declarations:[
        OrdersComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class OrdersModule
{}