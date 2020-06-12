import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { Product } from './product.model';

@Injectable({providedIn: 'root'})

export class AdminService{
    
    productCollection = this.afs.collection('products');

    constructor(
        private afs: AngularFirestore
    ){}

    addProduct(product: Product){        
        this.productCollection.doc( product.id.toString() ).set(product)
        .then(function() {
            alert("Product added successfully !");
        })
        .catch(function(error) {
            alert('Error adding product !');
            console.log("Error writing document: ", error);
        });
    }

    deleteProduct(productId){
        this.productCollection.doc( productId.toString() ).delete().then( ()=> {
            alert("Product successfully deleted!");
        }).catch(function(error) {
            console.log("Error removing document: ", error);
        });
    }
}