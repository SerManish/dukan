import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';

const routes:Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'product', component: ProductPageComponent}
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule
{
}