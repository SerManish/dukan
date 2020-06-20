import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { AngularFirestore } from '@angular/fire/firestore/';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ProductService {

    productsRef = this.afs.collection('products').ref;
    applyFilter = new BehaviorSubject<any>({ min: 0, max: 999999999, sortBy: 'Relevance' });

	//converts firestore objects to custom object, and vice versa
	//check firestore docs for more details
	productConverter = {
		toFirestore: function (product: Product) {
			let details = [];
			for (let detail in product.details) {
				details.push(detail);
			}
			return {
				id: product.id,
				category: product.category,
				name: product.name,
				imagePath: product.imagePath,
				description: product.description,
				price: product.price,
				details: details,
				isBestSeller: product.isBestSeller,
			}
		},
		fromFirestore: function (snapshot, options): Product {
			const data = snapshot.data(options);
			const product = new Product(
				data.id,
				data.category,
				data.name,
				data.imagePath,
				data.description,
				data.price,
				data.details,
				data.isBestSeller,
				data.tags
			);
			return product;
		}
	}

	constructor(
		private afs: AngularFirestore
	) { }

	//gets the product by id from the firestore
	//product converter is used to directly convert firestore product to product
	async getProductById(id: string) {
		let product: Product;
		await this.productsRef.doc(id)
			.withConverter(this.productConverter)
			.get().then(function (doc) {
				if (doc.exists) {
					product = doc.data();
				} else {
					throw ('No such product found.');
				}
			}).catch(function (error) {
				throw (error);
			});
		return product;
	}

	//gets all products from firestore whose name matches with the query 
	async getProducts(query: string) {
		let queries = query.split(" ");
		let products: Product[] = [];
		
		queries.forEach(async element => {
			await this.productsRef.where("tags", "array-contains", element)
			.get()
			.then(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					const data = doc.data();
					let product: Product = new Product(
						data.id,
						data.category,
						data.name,
						data.imagePath,
						data.description,
						data.price,
						data.details,
						data.isBestSeller,
						data.tags
					)
					products.push(product);
				});
			})
		});
		
		await this.productsRef.where("category", "==", query)
		.get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				const data = doc.data();
				let product: Product = new Product(
					data.id,
					data.category,
					data.name,
					data.imagePath,
					data.description,
					data.price,
					data.details,
					data.isBestSeller,
					data.tags
				)
				products.push(product);
			});
		})

		return products;
	}

}