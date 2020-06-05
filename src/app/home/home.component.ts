import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carouselImages = [
   "../assets/images/carousal0.jpg",
   "../assets/images/carousal1.jpg",
   "../assets/images/carousal2.jpg"
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
