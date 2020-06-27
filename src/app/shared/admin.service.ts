import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { Product } from './product.model';
import { AlertService } from './alert-bar/alert.service';
import { ProductService } from './product.service';

@Injectable({providedIn: 'root'})

export class AdminService{
    
    productCollection = this.afs.collection('products');

    constructor(
        private afs: AngularFirestore,
        private alertService: AlertService,
        private productService: ProductService
    ){}

    allOrders = [];

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

    deleteProduct(productId: { toString: () => string; }){

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
        for(let category of categories){
            imagesToSave.push({name: category.name, imagePath: category.source});
        }
        // console.log(imagesToSave, namesToSave);
        this.afs.collection('home').doc('category').set({images: imagesToSave})
        .then(() =>{
            this.alertService.alert('Category items updated');
        }).catch(error=>{
            this.alertService.alert(error, 'danger');
        });
    }

    async recieveAllOrders()
    {
        // this.afs.collection('orders').ref.get().
        //     (snapshot) => {
        //         console.log(snapshot.id);
        //     }
        // );
        
        this.allOrders = [];
        this.afs.collection('orders').get().subscribe(doc=>{
            doc.forEach(d=>{
                this.afs.collection('orders').doc(d.id).collection('users-orders').get().subscribe(
                    snapshot => {
                        snapshot.forEach(
                            async (doc) =>
                            {
                                let temp = doc.data();
                                temp['id']=doc.id;
                                temp['uid']=d.id;
                                this.allOrders.push(temp);
                            }
                        );
                    }
                );
            });
        });
        console.log(this.allOrders);
            
        //});
        
        // subscribe(
        //     snapshot => {
                
        //         console.log('as',snapshot);
        //         snapshot.forEach(
        //             async (doc) =>
        //             {
        //                 console.log('all',doc.data());   
        //             }
        //         )
        //     }
        // );
        //console.log('b',this.orders,typeof([1,3,4]));
    }
}
