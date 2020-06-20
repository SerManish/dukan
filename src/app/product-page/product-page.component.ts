import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/cart.service';
import { AlertService } from '../shared/alert-bar/alert.service';
import { AuthService } from '../shared/auth.service';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

	productId: string = '1000';
	product: Product;
	productSub: Subscription;
	isLoading = true;

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute,
		private cartService: CartService,
		private router: Router,
		private alertService: AlertService,
		private authService: AuthService
	) { }

	//gets the product id from the route fragment
	//uses productservice to get the product data by providing its id 
	ngOnInit(): void {

		this.productSub = this.route.params.subscribe(
			(params: Params) => {
				this.productId = params['id'];
				this.productService.getProductById(this.productId).then(prod => {
					this.product = prod;
					console.log('pp',prod);
					this.isLoading = false;
				}).catch(error => {
					this.alertService.alert(error, 'danger');
					this.router.navigate(['/home']);
				});
			}
		);

	}

	//checks if user is logged in
	//if user is logged in, send product to cart service to add it to the cart
	addToCart() {
		if (this.authService.isLoggedIn) {
			this.cartService.addToCart(this.product);
			this.alertService.alert('Product added to cart');
		}
		else {
			this.alertService.alert('Login to add product to cart');
		}
	}

	//checks if the user is logged in
	// if the user is logged in, navigate to cart
	buyNow() {
		if (this.authService.isLoggedIn) {
			this.cartService.addToCart(this.product);
			this.router.navigate(['cart', 'cartlist']);
		}
		else {
			this.alertService.alert('Login to buy product');
		}

	}

	ngOnDestroy() {
		this.productSub.unsubscribe();
	}

}
