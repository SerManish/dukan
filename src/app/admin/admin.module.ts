import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';

const routes:Routes = [
    { path:'admin',component:AdminComponent, children:[
        {path:'edit-home',component:EditHomeComponent},
        {path:'edit-products',component:EditProductsComponent},
        {path:'edit-orders',component:EditOrdersComponent}
    ]},
]

@NgModule({
    declarations:[
        AdminComponent,
        EditHomeComponent,
        EditProductsComponent,
        EditOrdersComponent
    ],
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports:[
        RouterModule
    ]
})
export class AdminModule
{}