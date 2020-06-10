import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  mode:string;
  newForm:FormGroup;
  @ViewChild('f') deleteForm:ElementRef;
  detailsArray:FormArray = new FormArray([]);

  constructor() { }

  ngOnInit(): void {
    this.newForm = new FormGroup({
      'id':new FormControl(null,Validators.required),
      'name':new FormControl(null,Validators.required),
      'imagePath':new FormControl(null,Validators.required),
      'shortDescription':new FormControl(null,Validators.required),
      'longDescription':new FormControl(null,Validators.required),
      'price':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'isBestSeller':new FormControl(false),
      'details': this.detailsArray
    });
  }

  addNewDetail()
  {
    (<FormArray>this.newForm.get('details')).push(
      new FormGroup({
        'detailType':new FormControl(null,Validators.required),
        'detailDesc':new FormControl(null,Validators.required)
      })
    );
  }

  removeDetail(index:number)
  {
    this.detailsArray.controls.splice(index,1);
    this.newForm.value['details'].splice(index,1);
  }

  addProduct()
  {
    console.log(this.newForm.value);
    this.clearForm();
  }

  deleteProduct()
  {
    console.log(this.deleteForm);
  }

  clearForm()
  {
    this.newForm.reset();
  }

}
