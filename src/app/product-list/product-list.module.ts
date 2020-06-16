import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { FilterComponent } from './filter/filter.component';
import { SharedModule } from '../shared/shared.module';



const routes:Routes = [
    {path:'',component:ProductListComponent}
]

@NgModule({
    declarations:[
        ProductListComponent,
        ProductListItemComponent,
        FilterComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    exports:[
        RouterModule
    ]
})
export class ProductListModule
{}