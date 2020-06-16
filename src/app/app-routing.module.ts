import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes:Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'admin',loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
    {path:'cart',loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
    {path:'orders',loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
    {path:'productlist',loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule)},
    {path:'product/:id',loadChildren: () => import('./product-page/product-page.module').then(m => m.ProductPageModule)}, 
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule
{
}