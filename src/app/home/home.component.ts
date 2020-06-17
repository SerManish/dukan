import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	carouselImages = [];

	products = []

	constructor(
		private afs: AngularFirestore,
		private router: Router
		) { }

	// gets the slider and category information from the database
	ngOnInit(): void {
	this.afs.collection('home').doc('slider').ref.get().then(doc => {
		this.carouselImages = doc.data().images;
	});
	this.afs.collection('home').doc('category').ref.get().then(doc => {
		this.products = doc.data().images;
	});
	}

	onSearch(query: string) {
		if (query.trim() != '')
			this.router.navigate(['productlist'], { fragment: query.trim() });
	}

}
