import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({providedIn: 'root'})

export class ProductService{

    loadedProducts: Product[] = [];
    
    constructor(){
        this.loadedProducts['1000'] = {
            id: '1000',
            name:"Grapes",
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
    }

    getProductById(id: string){
        return this.loadedProducts[id];
    }

    getProducts(query: string): Product[] {
      let queries: string[] = query.split(' ');
      let products: Product[] = [];
      let product: Product;

      for(let key in this.loadedProducts){
        product = this.loadedProducts[key];
        for(let q of queries){
          if( product.name.toLocaleLowerCase().search(q.toLocaleLowerCase()) != -1 ){
            products.push(product);
            break;
          }
        }
      }

      return products; 
    }

}