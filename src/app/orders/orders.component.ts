import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../shared/auth.service';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private afs: AngularFirestore,
		private authservice: AuthService
	) { }
	orders = [];
	products = new Map<string, object>();

	// recieves user's orders after resolved by a resolver and stores locally in orders
	ngOnInit(): void {
		this.route.data.subscribe(data => {
			data.ords.forEach((doc) => {
				let temp = doc.data();
				temp['id'] = doc.id;
				this.orders.push(temp);
			});
		});
	}

	/* cancel user's order by confirming and then changing it's status locally and in database 
		it uses authservice to get the user data then use it to access database*/
	cancelOrder(index: number) {
		if (confirm("Are You Sure You want to cancel this Order ?")) {
			this.authservice.user.subscribe(
				(user) => {
					if (user) {
						this.afs.collection('orders').doc(user.uid).collection('users-orders').doc(this.orders[index].id).update({ status: 'Cancelled' });
						this.orders[index].status = "Cancelled";
					}
				}
			);
		}
	}
}
