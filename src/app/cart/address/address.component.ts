import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  successPage()
  {
    this.router.navigate(['/cart','ordersuccess']);
  }
}
