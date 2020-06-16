import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/product.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  searchQuery: string = null;
  searchResult:Product[] = [];//list of product recieved from the server
  filteredResult:Product[] = [];
  routeSub: Subscription;
  isLoading=false;//boolean to guide spinner
  filter;
  filterSub = new Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  
  /* extracts search keyword from url fragment and then use product service to search that keyword in datbase
	 and store it in search result array it also manage the spinner */
  ngOnInit(): void {
    this.isLoading = true;
    this.routeSub = this.route.fragment.subscribe(
      (fragment) => {
        this.searchQuery = fragment;
        this.isLoading = true;
        this.productService.getProducts(this.searchQuery).then( products =>{
          this.searchResult = products;
          this.filteredResult = this.searchResult;
          this.filteredResult.sort((a,b)=> a.isBestSeller?-1:1);
          this.isLoading=false;
        });
      }
    );

    this.filterSub = this.productService.applyFilter.subscribe(data=>{
      this.filter = data;
      this.filteredResult = [];
      for(let i=0;i<this.searchResult.length;i++){
        const price = this.searchResult[i].price;
        if(price<=this.filter.max && price>=this.filter.min){
          this.filteredResult.push(this.searchResult[i]);
        }
      }

      if(this.filter.sortBy=='Relevance'){
        this.filteredResult.sort((a,b)=> a.isBestSeller?-1:1);
      }
      else if(this.filter.sortBy=='Price : Low to High'){
        this.filteredResult.sort((a,b) => a.price - b.price);
      }
      else if(this.filter.sortBy=='Price : High to Low'){
        this.filteredResult.sort((a,b) => b.price - a.price);
      }

    });
  }

  // unsubscribes the subsription to avoid memory leaks
  ngOnDestroy(){
    this.routeSub.unsubscribe();
    this.filterSub.unsubscribe();
  }

}
