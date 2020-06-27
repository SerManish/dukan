import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.css']
})
export class EditHomeComponent implements OnInit {

  mode:string;
  sliderForm:FormGroup;
  imageArray:FormArray = new FormArray([]);
  categoryForm:FormGroup;
  categoryArray:FormArray = new FormArray([]);

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.sliderForm = new FormGroup({
      'images': this.imageArray
    });
    this.categoryForm = new FormGroup({
      'categories':this.categoryArray
    });
  }

  changeHome()
  {
    this.adminService.saveSlider(this.imageArray.value);
  }

  changeCategory()
  {
    this.adminService.saveCategory(this.categoryArray.value);
  }

  addNewImage()
  {
    (<FormArray>this.sliderForm.get('images')).push(
      new FormGroup({
        'source':new FormControl(null,Validators.required)
      })
    );
  }

  removeImage(index:number)
  {
    this.imageArray.controls.splice(index,1);
    this.sliderForm.value['images'].splice(index,1);
  }

  addNewCategory()
  {
    (<FormArray>this.categoryForm.get('categories')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'source':new FormControl(null,Validators.required)
      })
    );
  }

  removeCategory(index:number)
  {
    this.categoryArray.controls.splice(index,1);
    this.categoryForm.value['categories'].splice(index,1);
  }

  clearForm()
  {
    if(this.mode=='slider')
      this.sliderForm.reset();
    else
      this.categoryForm.reset();
  }

}
