import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css']
})
export class HomeProductsComponent implements OnInit {
  @Input() productDetails:{name:string,imagePath:string};
  constructor() { }

  ngOnInit(): void {
  }

}
