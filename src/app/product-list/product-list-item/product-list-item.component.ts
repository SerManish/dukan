import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-product-list-item',
	templateUrl: './product-list-item.component.html',
	styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent {
	@Input() product: Product;// recieves product as input through property binding
	constructor(private router: Router) { }

	// navigate user to product page of the selected product
	openDetails() {
		this.router.navigate(['product', this.product.id])
	}
}
