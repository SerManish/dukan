import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { Product } from './product.model';
import { AlertService } from './alert-bar/alert.service';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })

export class AdminService {

	//reference to the products collection on firestore
	productCollection = this.afs.collection('products');

	constructor(
		private afs: AngularFirestore,
		private alertService: AlertService,
		private productService: ProductService
	) { }

	allOrders = [];

	//takes product object
	//checks if already exists in firestore
	//if it doesn't exist, it is added
	//else alert is displayed
	addProduct(product: Product) {
		this.productCollection.doc(product.id.toString()).ref.get().then(doc => {
			if (!doc.exists) {
				this.productCollection.doc(product.id.toString()).set(product)
				this.alertService.alert("Product added successfully !");
			}
			else {
				this.alertService.alert('Product with given ID already exists', 'danger');
			}
		});

	}

	//takes id of the product
	//checks if product exists on firestore
	//if it exists, it is deleted from firestore
	//else alert is displayed
	deleteProduct(productId: { toString: () => string; }) {

		this.productCollection.doc(productId.toString()).ref.get().then(doc => {
			if (doc.exists) {
				this.productCollection.doc(productId.toString()).delete().then(() => {
					this.alertService.alert("Product successfully deleted!");
				})
			}
			else {
				this.alertService.alert('No products exists with the given ID', 'danger');
			}
		});
	}

	//takes images and pick their sources and store all the array to firestore
	saveSlider(images) {
		let imagesToSave = []
		for (let image of images) {
			imagesToSave.push(image.source);
		}
		this.afs.collection('home').doc('slider').set({ images: imagesToSave })
			.then(() => {
				this.alertService.alert('Slider images updated');
			}).catch(error => {
				this.alertService.alert(error, 'danger');
			});
	}

	//saves category names and source of the image to show with category to firestore
	saveCategory(categories) {
		let imagesToSave = [];
		for (let category of categories) {
			imagesToSave.push({ name: category.name, imagePath: category.source });
		}
		this.afs.collection('home').doc('category').set({ images: imagesToSave })
			.then(() => {
				this.alertService.alert('Category items updated');
			}).catch(error => {
				this.alertService.alert(error, 'danger');
			});
	}

	//gets all orders from firestore 
	//then for each user extracts all of their orders and stores them in a single array
	//userid and orderid is extracted separately
	async recieveAllOrders() {

		this.allOrders = [];
		this.afs.collection('orders').get().subscribe(doc => {
			doc.forEach(d => {
				this.afs.collection('orders').doc(d.id).collection('users-orders').get().subscribe(
					snapshot => {
						snapshot.forEach(
							async (doc) => {
								let temp = doc.data();
								temp['id'] = doc.id;
								temp['uid'] = d.id;
								this.allOrders.push(temp);
							}
						);
					}
				);
			});
		});
	}
}
