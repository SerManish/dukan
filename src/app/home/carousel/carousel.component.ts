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
	@Input() images: string[] = [];// carousel images
	currentSlide = 0;
	timer: any;
	constructor() { }

	// initialized the timer and direction of carousel
	ngOnInit(): void {
		this.timer = setInterval(this.rightSlider.bind(this), 10000);
	}

	//load the immediate left slide
	leftSlider() {
		this.currentSlide--;
		if (this.currentSlide == -1)
			this.currentSlide = this.images.length - 1;
	}

	//load the immediate right slide
	rightSlider() {
		this.currentSlide++;
		if (this.currentSlide == this.images.length)
			this.currentSlide = 0;
	}

	//reset the timer then slides towards left and set the timer 
	slideLeft() {
		clearTimeout(this.timer);
		this.leftSlider();
		this.timer = setInterval(this.rightSlider.bind(this), 10000);
	}

	//reset the timer then slides towards right and set the timer 
	slideRight() {
		clearTimeout(this.timer);
		this.rightSlider();
		this.timer = setInterval(this.rightSlider.bind(this), 10000);
	}

}
