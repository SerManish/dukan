import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { PreloadGuard } from '../shared/preload.guard';

const routes:Routes = [
    {path:'',component: OrdersComponent, resolve:{ords:PreloadGuard}}
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