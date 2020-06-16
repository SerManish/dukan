import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  showFilter = false;

  constructor() {}

  toggleFilter()
  {
    this.showFilter=!this.showFilter;
  }

  ngOnInit(): void {
  }

}
