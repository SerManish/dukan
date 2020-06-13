import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { Product } from './product.model';
import { AlertService } from './alert-bar/alert.service';

@Injectable({providedIn: 'root'})

export class AdminService{
    
    productCollection = this.afs.collection('products');

    constructor(
        private afs: AngularFirestore,
        private alertService: AlertService
    ){}

    addProduct(product: Product){
        this.productCollection.doc(product.id.toString()).ref.get().then( doc=>{
            if(!doc.exists){
                this.productCollection.doc( product.id.toString() ).set(product)
                this.alertService.alert("Product added successfully !");
            }
            else{
                this.alertService.alert('Product with given ID already exists', 'danger');
            }
        }); 
        
    }

    deleteProduct(productId){

        this.productCollection.doc(productId.toString()).ref.get().then( doc=>{
            if(doc.exists){
                this.productCollection.doc( productId.toString() ).delete().then( ()=> {
                    this.alertService.alert("Product successfully deleted!");
                })
            }
            else{
                this.alertService.alert('No products exists with the given ID', 'danger');
            }
        });

        
    }
}