import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  mode:string;
  newForm:FormGroup;
  @ViewChild('f') deleteForm;
  detailsArray:FormArray = new FormArray([]);

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.newForm = new FormGroup({
      'id':new FormControl(null,Validators.required),
      'name':new FormControl(null,Validators.required),
      'category':new FormControl(null,Validators.required),
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
    this.productService.addProduct(this.newForm.value);
    this.clearForm();
  }

  deleteProduct()
  {
    this.productService.deleteProduct(this.deleteForm.value.id);
  }

  clearForm()
  {
    this.newForm.reset();
  }

}
