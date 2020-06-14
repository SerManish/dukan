import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.css']
})
export class EditOrdersComponent implements OnInit {


  constructor(
    private adminService:AdminService
  ) { }

  	ngOnInit(): void {
    this.adminService.recieveAllOrders();
	}
}
