import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @ViewChild('navToggle') navToggleElement: ElementRef;
  @Output() onExpandToggle = new EventEmitter<boolean>();
  isExpanded: boolean = false;
  isLoggedIn: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.navToggleElement.nativeElement.style.display = 'none';
  }

  onNavToggle(){
    this.isExpanded = !this.isExpanded;
    this.onExpandToggle.emit(this.isExpanded); 
    this.navToggleElement.nativeElement.style.display = this.navToggleElement.nativeElement.style.display == 'none' ? 'inline-block':'none'; 
  }

}
