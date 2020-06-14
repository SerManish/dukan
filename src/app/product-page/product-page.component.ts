import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/cart.service';
import { AlertService } from '../shared/alert-bar/alert.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  productId: string = '1000';
  product: Product;
  productSub: Subscription;
  isLoading=true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService:CartService,
    private router:Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void { 
    
    this.productSub = this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['id'];
        this.productService.getProductById(this.productId).then( prod=>{
          this.product = prod;
          this.isLoading=false;
        }).catch( error=>{
          this.alertService.alert(error, 'danger');
        });
      }
    );
      
  }

  addToCart()
  {
    this.cartService.addToCart(this.product);
  }

  buyNow()
  {
    this.cartService.addToCart(this.product);
    this.router.navigate(['cart','cartlist']);
  }

  ngOnDestroy(){
    this.productSub.unsubscribe();
  }

}
