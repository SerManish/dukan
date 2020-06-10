import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray,Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  mode:string;
  newForm:FormGroup;
  details:FormArray = new FormArray([]);

  constructor() { }

  ngOnInit(): void {
    this.newForm = new FormGroup({
      'id':new FormControl("",Validators.required),
      'name':new FormControl("",Validators.required),
      'imagePath':new FormControl("",Validators.required),
      'shortDescription':new FormControl("",Validators.required),
      'longDescription':new FormControl("",Validators.required),
      'price':new FormControl("",[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'isBestSeller':new FormControl(),
      'details': this.details
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

  }

  onSubmit()
  {
    console.log(this.newForm.value);
  }

}
