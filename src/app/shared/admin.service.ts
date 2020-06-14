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

    saveSlider(images){
        let imagesToSave = []
        for(let image of images){
            imagesToSave.push(image.source);
        }
        // console.log(imagesToSave);
        this.afs.collection('home').doc('slider').set({images: imagesToSave})
        .then(() =>{
            this.alertService.alert('Slider images updated');
        }).catch(error=>{
            this.alertService.alert(error, 'danger');
        });
    }

    saveCategory(categories){
        let imagesToSave=[];
        let namesToSave=[]
        for(let category of categories){
            imagesToSave.push(category.source);
            namesToSave.push(category.name);
        }
        // console.log(imagesToSave, namesToSave);
        this.afs.collection('home').doc('category').set({images: imagesToSave, names: namesToSave})
        .then(() =>{
            this.alertService.alert('Category items updated');
        }).catch(error=>{
            this.alertService.alert(error, 'danger');
        });
    }
}