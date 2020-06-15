import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/admin.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    public adminService:AdminService,
    private route: ActivatedRoute
  ) {}

  orders = [];
  products = new Map<string , object>();
  
  userSubscription:Subscription;

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      data.ords.forEach( (doc) =>{
        let temp = doc.data();
        temp['id'] = doc.id; 
        this.orders.push(temp);
      });
    });
  }
}
