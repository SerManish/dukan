import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CartService } from '../../../shared/cart.service';
import { Product } from 'src/app/shared/product.model';
import { Subscription } from 'rxjs';

@Component({
	selector: '[table-row]',
	templateUrl: './cart-list-item.component.html',
	styleUrls: ['./cart-list-item.component.css']
})
export class CartListItemComponent implements OnInit, OnDestroy {
	@Input() cartItem: Product;//takes product as input using property binding
	@Input() index: number;// takes index of product using property binding
	quantity: number;// quantity of the product
	total: number;// total price of the product (total = unit price X quantity)

	quantitySubscription: Subscription;
	quantityArray = [1, 2, 3, 4, 5, 6];//select has this array as option in the template

	constructor(private cartService: CartService) {

	}

	// calls a cartservice method to delete the element from the cart both locally and from database
	deleteItem() {
		this.cartService.removeItem(this.index);
	}

	// calls a cartservice method to update the quantity and price of item
	updatePrice() {
		this.cartService.updateQuantity(this.index, this.quantity);
	}

	// initialized quantity and subscribes to any changes in quantity from other components
	ngOnInit(): void {
		this.quantity = 1;
		this.quantitySubscription = this.cartService.quantityUpdated.subscribe(
			(quantityList) => this.quantity = quantityList[this.index]
		);
	}

	// destroys the subscription to avoid memory leak
	ngOnDestroy() {
		this.quantitySubscription.unsubscribe();
	}

}
