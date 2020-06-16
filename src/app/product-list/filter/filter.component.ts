import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from 'src/app/shared/alert-bar/alert.service';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @ViewChild('filterForm') filterForm: ElementRef;
  showFilter = false;
  filter = {min: 0, max: 999999999, sortBy: 'Relevance'};

  constructor(
    private alertService: AlertService,
    private productService: ProductService
  ) {
    this.productService.applyFilter.next(this.filter);
  }

  toggleFilter()
  {
    this.showFilter=!this.showFilter;
  }

  ngOnInit(): void {
  }

  onApplyFilter(){
    const form = this.filterForm.nativeElement;
    this.filter.min = form.minimum.value==''? 0 : Number(form.minimum.value);
    this.filter.max = form.maximum.value==''? 999999999 : Number(form.maximum.value);
    this.filter.sortBy = form.sortBy.value;

    // console.log(this.filter);
    if(this.filter.min>999999999 || this.filter.max>999999999){
      this.alertService.alert('Maximum price should be less than 1000000000.');
      return;
    }
    if(this.filter.min>this.filter.max){
      this.alertService.alert('Minimum price should be less than Maximum price.');
      return;
    }
    
    this.productService.applyFilter.next(this.filter);
  }

}
