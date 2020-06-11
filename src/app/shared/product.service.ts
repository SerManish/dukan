import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({providedIn: 'root'})

export class ProductService{

    loadedProducts: Product[] = [];
    
    constructor(){
        this.loadedProducts['1000'] = {
            id: '1000',
            category: 'fruit',
            name:"Orange",
            imagePath:"../../../assets/images/carousal0.jpg",
            shortDescription:`Some Description about the item in few words`,
            longDescription:`Some Description about the item in few words,
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
            category: 'camera',
            name:"Camera",
            imagePath:"../../../assets/images/carousal1.jpg",
            shortDescription:`Some Description about the item in few words`,
            longDescription:`Some Description about the item in few words,
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
            category: 'fruit',
            name:"Bananas",
            imagePath:"../../../assets/images/carousal2.jpg",
            shortDescription:`Some Description about the item in few words`,
            longDescription:`Some Description about the item in few words,
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
            category: 'fruit',
            name:"Rich Grapes",
            imagePath:"../../../assets/images/carousal0.jpg",
            shortDescription:`Some Description about the item in few words`,
            longDescription:`Some Description about the item in few words,
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
      let products: Product[] = [];
      
      if(query==null){
        for(let key in this.loadedProducts){
          products.push(this.loadedProducts[key]);
        }
      }
      else{
        let queries: string[] = query.split(' ');

        for(let key in this.loadedProducts){
          for(let q of queries){
            if( q!='' && this.loadedProducts[key].name.toLocaleLowerCase().search(q.toLocaleLowerCase()) != -1 ){
              products.push(this.loadedProducts[key]);
              break;
            }
          }
        }
      }

      return products; 
    }

    // EDIT THE FOLLOWING FUNTIONS (PREFERABLY RECODE THIS SERVICE)

    addProduct(product:Product)
    {
      let index:number = -1;
      for(let i=0;i<this.loadedProducts.length;i++)
      {
        if(product.id == this.loadedProducts[i].id)
        {
          index = i;
          break;
        }
      }
      if(index != -1)
        throw("Product Already Exists");
      else
        this.loadedProducts.push(product);
    }

    deleteProduct(id:string)
    {
      let index:number = -1;
      for(let i=0;i<this.loadedProducts.length;i++)
      {
        if(id == this.loadedProducts[i].id)
        {
          index = i;
          break;
        }
      }
      if(index == -1)
        throw("Invalid Product ID");
      else
        this.loadedProducts.splice(index,1);
    }

}