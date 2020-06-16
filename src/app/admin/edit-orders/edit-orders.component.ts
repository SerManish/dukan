import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.css']
})
export class EditOrdersComponent implements OnInit {
  @ViewChild('status') select:ElementRef;
  orders = [];

  constructor(
    private adminService:AdminService,
    private afs: AngularFirestore
  ) { }

  	ngOnInit(): void {
    this.adminService.recieveAllOrders();
    this.orders = this.adminService.allOrders;
  }
  
  changeStatus(index:number)
  {
    let newStatus = this.select.nativeElement.value;
    if(newStatus=="Delivered" || newStatus=="Cancelled")
    {
      if(confirm("once marked delivered or cancelled you won't be able to change it ?"))
        this.orders.splice(index,1);
    }
    this.afs.collection('orders').doc(this.orders[index].uid).collection('users-orders').doc(this.orders[index].id).update({status:newStatus});
  }
}
