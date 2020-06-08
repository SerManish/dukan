import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeProductsComponent } from './home-products/home-products.component';
import { CarouselComponent } from './carousel/carousel.component';

const routes:Routes = [
    {path:'home',component:HomeComponent}
]

@NgModule({
    declarations:[
        HomeComponent,
        HomeProductsComponent,
        CarouselComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class HomeModule
{}