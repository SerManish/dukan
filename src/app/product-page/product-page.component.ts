import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  productId: string = '1000';
  product: Product;
  productSub: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void { 
    
    this.productSub = this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['id'];
      }
    );

    this.product = this.productService.getProductById(this.productId);
    
  }

  ngOnDestroy(){
    this.productSub.unsubscribe();
  }

}
