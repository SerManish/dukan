import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/admin.service';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';
import { error } from 'protractor';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    public adminService:AdminService,
    private authservice:AuthService
  ) { }

  orders = [];
  products = new Map<string , object>();
  
  userSubscription:Subscription;

  ngOnInit(): void {
    this.userSubscription = this.authservice.user.subscribe(
      async (user) => {
        if(user)
        {
          await this.adminService.recieveOrders(user.uid);
          this.orders = this.adminService.orders;
        }
      }
  );
  console.log('1',this.adminService.orders);
  
  }
}
