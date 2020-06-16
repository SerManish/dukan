import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/product.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

	searchQuery: string = null;
	searchResult: Product[] = [];//list of product recieved from the server
	routeSub: Subscription;
	isLoading = false;//boolean to guide spinner

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute
	) { }
	
	/* extracts search keyword from url fragment and then use product service to search that keyword in datbase
	 and store it in search result array it also manage the spinner */
	ngOnInit(): void {
		this.isLoading = true;
		this.routeSub = this.route.fragment.subscribe(
			(fragment) => {
				this.searchQuery = fragment;
				this.isLoading = true;
				this.productService.getProducts(this.searchQuery).then(products => {
					this.searchResult = products;
					this.isLoading = false;
				});
			}
		);
	}

	// unsubscribes the subsription to avoid memory leaks
	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}

}
