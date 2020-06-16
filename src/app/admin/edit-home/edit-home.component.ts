import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
	selector: 'app-edit-home',
	templateUrl: './edit-home.component.html',
	styleUrls: ['./edit-home.component.css']
})
export class EditHomeComponent implements OnInit {

	mode:string;// mode of form
	sliderForm:FormGroup;
	imageArray:FormArray = new FormArray([]);//part of sliderForm
	categoryForm:FormGroup;
	categoryArray:FormArray = new FormArray([]);// part of categoryForm

	constructor(private adminService: AdminService) { }

	// initializes form groups when component is initialized
	ngOnInit(): void {
		this.sliderForm = new FormGroup({
			'images': this.imageArray
		});
		this.categoryForm = new FormGroup({
			'categories':this.categoryArray
		});
	}

	/* calls a adminservice funtion which updated slider images in database
		 and hence in the app (users must reload to see changes)*/
	changeHome()
	{
		this.adminService.saveSlider(this.imageArray.value);
	}

	/* calls a adminservice function which updated categories in database 
		 and hence in the app (users must reload to see changes)*/
	changeCategory()
	{
		this.adminService.saveCategory(this.categoryArray.value);
	}

	// add new image to slider locally (doesn't effect the app untill saved)
	addNewImage()
	{
		(<FormArray>this.sliderForm.get('images')).push(
			new FormGroup({
				'source':new FormControl(null,Validators.required)
			})
		);
	}

	// remove the image of given index from the slider locally (doesn't effect the app untill saved)
	removeImage(index:number)
	{
		this.imageArray.controls.splice(index,1);
		this.sliderForm.value['images'].splice(index,1);
	}

	// adds new Category locally (doesn't effect the app untill saved) 
	addNewCategory()
	{
		(<FormArray>this.categoryForm.get('categories')).push(
			new FormGroup({
				'name':new FormControl(null,Validators.required),
				'source':new FormControl(null,Validators.required)
			})
		);
	}

	// removes a category locally (doesn't effect the app untill saved)
	removeCategory(index:number)
	{
		this.categoryArray.controls.splice(index,1);
		this.categoryForm.value['categories'].splice(index,1);
	}

	// clear the selected form
	clearForm()
	{
		if(this.mode=='slider')
			this.sliderForm.reset();
		else
			this.categoryForm.reset();
	}

}
