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

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.isLoading = true;
    this.routeSub = this.route.fragment.subscribe(
      (fragment) => {
        this.searchQuery = fragment;
        this.isLoading = true;
        this.productService.getProducts(this.searchQuery).then( products =>{
          this.searchResult = products;
          this.isLoading=false;
        });
        // console.log(this.searchResult);
      }
    );
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
