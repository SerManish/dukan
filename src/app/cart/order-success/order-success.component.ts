import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  orderId:string;
  deliveryDate = new Date();

  constructor(
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.orderId = this.cartService.orderId;
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 7);
  }
}
