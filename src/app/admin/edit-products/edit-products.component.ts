import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
	selector: 'app-edit-products',
	templateUrl: './edit-products.component.html',
	styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

	mode: string;// mode of form "edit" or "delete"
	newForm: FormGroup;// new Product Form reactive approach
	@ViewChild('f') deleteForm; // referece of deleteForm TD approach
	detailsArray: FormArray = new FormArray([]);// part of newForm

	constructor(
	private productService: ProductService,
	private adminService: AdminService
	) { }

	// initializes newForm
	ngOnInit(): void {
	this.newForm = new FormGroup({
		'id': new FormControl(null, Validators.required),
		'name': new FormControl(null, Validators.required),
		'category': new FormControl(null, Validators.required),
		'imagePath': new FormControl(null, Validators.required),
		'shortDescription': new FormControl(null, Validators.required),
		'longDescription': new FormControl(null, Validators.required),
		'price': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
		'isBestSeller': new FormControl(false),
		'details': this.detailsArray
	});
	}

	// add new Detail to newForm
	addNewDetail() {
	(<FormArray>this.newForm.get('details')).push(
		new FormGroup({
		'detailType': new FormControl(null, Validators.required),
		'detailDesc': new FormControl(null, Validators.required)
		})
	);
	}

	// remove the detail with given index
	removeDetail(index: number) {
	this.detailsArray.controls.splice(index, 1);
	this.newForm.value['details'].splice(index, 1);
	}

	// calls a admin service which saves the products into database
	addProduct() {
	this.adminService.addProduct(this.newForm.value);
	this.clearForm();
	}

	// calls a admin service which deletes a product of given id
	deleteProduct() {
	this.adminService.deleteProduct(this.deleteForm.value.id);
	}

	// clear the selected form;
	clearForm() {
	this.newForm.reset();
	}

}
