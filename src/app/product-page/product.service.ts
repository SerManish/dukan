import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({providedIn: 'root'})

export class ProductService{

    loadedProducts: Product[] = [];
    
    constructor(){
        this.loadedProducts['1000'] = {
            id: '1000',
            name:"Orange",
            imagePath:"../../../assets/images/carousal0.jpg",
            description:`Some Description about the item in few words,
            Some Description about the item in few words,
            Some Description about the item in few words
            Some Description about the item in few words`,
            price:29.99,
            isBestSeller: true,
            details: [
              {detailType:'Battery', detailDesc:'10000 mah'},
              {detailType:'Colour', detailDesc:'Yellow'},
              {detailType:'RAM', detailDesc:'16GB'},
            ]
          };

          this.loadedProducts['1001'] = {
            id: '1001',
            name:"Camera",
            imagePath:"../../../assets/images/carousal1.jpg",
            description:`Some Description about the item in few words,
            Some Description about the item in few words,
            Some Description about the item in few words
            Some Description about the item in few words`,
            price: 49990,
            isBestSeller: true,
            details: [
              {detailType:'Battery', detailDesc:'10000 mah'},
              {detailType:'Colour', detailDesc:'Black'},
              {detailType:'Resolution', detailDesc:'4K'},
              {detailType:'Company', detailDesc:'Kanon'},
            ]
          };

          this.loadedProducts['1002'] = {
            id: '1002',
            name:"Bananas",
            imagePath:"../../../assets/images/carousal2.jpg",
            description:`Some Description about the item in few words,
            Some Description about the item in few words,
            Some Description about the item in few words
            Some Description about the item in few words`,
            price:109.99,
            isBestSeller: true,
            details: [
              {detailType:'Best before', detailDesc:'3 days'},
              {detailType:'Colour', detailDesc:'Yellow'}
            ]
          }
          this.loadedProducts['1003'] = {
            id: '1003',
            name:"Rich Grapes",
            imagePath:"../../../assets/images/carousal0.jpg",
            description:`Some Description about the item in few words,
            Some Description about the item in few words,
            Some Description about the item in few words
            Some Description about the item in few words`,
            price:2099.99,
            isBestSeller: false,
            details: [
              {detailType:'Best before', detailDesc:'8 days'},
              {detailType:'Colour', detailDesc:'Purple'}
            ]
          }
    }

    getProductById(id: string){
        return this.loadedProducts[id];
    }

    getProducts(query: string): Product[] {
      let queries: string[] = query.split(' ');
      let products: Product[] = [];
      let product: Product;

      for(let key in this.loadedProducts){
        for(let q of queries){
          if( q!='' && this.loadedProducts[key].name.toLocaleLowerCase().search(q.toLocaleLowerCase()) != -1 ){
            products.push(this.loadedProducts[key]);
            break;
          }
        }
      }

      return products; 
    }

}