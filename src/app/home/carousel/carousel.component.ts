import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('800ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('800ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {
  @Input() images:string[] = [];
  currentSlide = 0;
  timer:any;
  constructor() { }

  ngOnInit(): void {
    this.timer = setInterval(this.rightSlider.bind(this), 10000);
  }

  leftSlider()
  {
    this.currentSlide--;
    if(this.currentSlide==-1)
      this.currentSlide = this.images.length-1;
  }

  rightSlider()
  {
    this.currentSlide++;
    if(this.currentSlide==this.images.length)
      this.currentSlide = 0;
  }

  slideLeft()
  {
    clearTimeout(this.timer);
    this.leftSlider();
    this.timer = setInterval(this.rightSlider.bind(this), 10000);
  }

  slideRight()
  {
    clearTimeout(this.timer);
    this.rightSlider();
    this.timer = setInterval(this.rightSlider.bind(this), 10000);
  }

}
