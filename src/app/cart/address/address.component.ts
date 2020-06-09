import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @ViewChild('f') addressForm;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  
  onSubmit()
  {
    this.router.navigate(['/cart','ordersuccess']);
  }
}
