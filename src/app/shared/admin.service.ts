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

    orders = [];
    allOrders = new Map<string, object[]>();

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

    async recieveOrders(uid:string)
    {
        this.orders = [];
        this.afs.collection('orders').doc(uid).collection('users-orders').get().subscribe(
            snapshot => {
                snapshot.forEach(
                    async (doc) =>
                    {
                        let temp = doc.data();
                        temp['id'] = doc.id; 
                        this.orders.push(temp);
                    }
                )
            }
        );
        console.log(this.orders);
    }

    async recieveAllOrders()
    {
        // this.afs.collection('orders').ref.get().
        //     (snapshot) => {
        //         console.log(snapshot.id);
        //     }
        // );
        
        this.allOrders.clear();
        this.afs.collection('orders').get().subscribe(doc=>{
            doc.forEach(d=>{
                this.afs.collection('orders').doc(d.id).collection('users-orders').get().subscribe(
                    snapshot => {
                        let order=[];
                        snapshot.forEach(
                            async (doc) =>
                            {
                                order.push(doc.data());
                            }
                        );
                        this.allOrders.set(d.id, order);
                    }
                );
                // console.log('pro',d.id, d.data());
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