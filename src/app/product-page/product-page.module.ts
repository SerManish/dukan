import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductPageComponent } from './product-page.component';

const routes: Routes = [
	{ path: '', component: ProductPageComponent }
]

@NgModule({
	declarations: [
		ProductPageComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class ProductPageModule { }