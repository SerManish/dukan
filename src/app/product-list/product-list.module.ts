import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { FilterComponent } from './filter/filter.component';



const routes:Routes = [
    {path:'productlist',component:ProductListComponent}
]

@NgModule({
    declarations:[
        ProductListComponent,
        ProductListItemComponent,
        FilterComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class ProductListModule
{}