import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { AngularFirestore } from '@angular/fire/firestore/';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ProductService{

    productsRef = this.afs.collection('products').ref;

    productConverter = {
      toFirestore: function(product:Product) {
          let details=[];
          for(let detail in product.details){
            details.push(detail);
          }
          return {
            id: product.id,
            category: product.category,
            name: product.name,
            imagePath: product.imagePath ,
            shortDescription: product.shortDescription ,
            price: product.price ,
            longDescription: product.longDescription ,
            details: details,
            isBestSeller: product.isBestSeller ,
          }
      },
      fromFirestore: function(snapshot, options):Product{
          const data = snapshot.data(options);
          const product=new Product(
            data.id, 
            data.category, 
            data.name, 
            data.imagePath, 
            data.shortDescription, 
            data.longDescription, 
            data.price,
            data.details,
            data.isBestSeller
          );
          // console.log('data',product);
            
          return product; 
      }
    }
    
    constructor(
      private afs: AngularFirestore
    ){}

    async getProductById(id: string){
      // console.log(this.loadedProducts);
      let product: Product;
      await this.productsRef.doc(id)
      .withConverter(this.productConverter)
      .get().then(function(doc) {
        if (doc.exists){
          product = doc.data();
        } else {
          throw('no such product');
        }}).catch(function(error) {
          throw(error);
        });
        return product;
    }

    async getProducts(query: string) {
      let products: Product[]=[];
      await this.productsRef.where("name", "==", query)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
          const data = doc.data();
          let product: Product = new Product(
            data.id, 
            data.category,
            data.name,
            data.imagePath, 
            data.shortDescription, 
            data.longDescription, 
            data.price, 
            data.details, 
            data.isBestSeller
          )
          products.push(product);
      });
    })

    return products;
  }

}