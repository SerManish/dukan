import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { AngularFirestore } from '@angular/fire/firestore/';

@Injectable({providedIn: 'root'})

export class ProductService{

    loadedProducts: Map< string, Product> = new Map();

    productConverter = {
      toFirestore: function(product) {
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
      fromFirestore: function(snapshot, options){
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
    ){
      const productCollection = afs.collection("products");
      productCollection.ref.onSnapshot( snapshot=>{
        snapshot.docChanges().forEach(change=>{
          
          if (change.type === "added") {
            console.log("New product : ", change.doc.data());
            
            change.doc.ref.withConverter(this.productConverter).get().then(doc=>{
              doc.ref.withConverter(this.productConverter)
              .get().then( (doc) => {
                if (doc.exists){  
                  let product = doc.data();
                  this.loadedProducts.set(product.id.toString(), product);
                } else {
                  console.log("No such document!")
                }}).catch( (error) => {
                  console.log("Error getting document:", error)
                });
            });

          }

          if (change.type === "modified") {
              console.log("Modified Product: ", change.doc.data());
          }
          
          if (change.type === "removed") {
            const id = change.doc.data().id.toString();
            if(this.loadedProducts.has(id)){
              this.loadedProducts.delete(id);
            }
            console.log("Removed product: ", change.doc.data().id);
          }
        })
      });
    }

    getProductById(id: string){
      // console.log(this.loadedProducts);
      return this.loadedProducts.get(id);
    }

    getProducts(query: string): Product[] {
      let products: Product[] = [];
      if(query==null){
        for(let product of this.loadedProducts.values()){
          products.push(product);
        }
      }
      else{
        let queries: string[] = query.split(' ');

        for(let product of this.loadedProducts.values()){
          for(let q of queries){
            if(q!='' && product.name.toLocaleLowerCase().search(q.toLocaleLowerCase()) != -1 ){
              products.push(product);
              break;
            }
          }
        }
      }
      return products; 
    }

}