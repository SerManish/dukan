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
  searchResult:Product[] = [];
  routeSub: Subscription;
  isLoading=false;
  filter;
  filterSub = new Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.routeSub = this.route.fragment.subscribe(
      (fragment) => {
        this.searchQuery = fragment;
        this.productService.getProducts(this.searchQuery).then( products =>{
          this.searchResult = products;
          this.isLoading=true;
        });
        // console.log(this.searchResult);
      }
    );

    this.filterSub = this.productService.applyFilter.subscribe(data=>{
      this.filter = data;
      console.log(this.filter);
    });
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
    this.filterSub.unsubscribe();
  }

}
