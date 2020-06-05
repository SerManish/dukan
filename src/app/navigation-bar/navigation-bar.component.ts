import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @ViewChild('navToggle') navToggleElement: ElementRef;
  isLoggedIn: boolean = false;
  isExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.navToggleElement.nativeElement.style.display = 'none';
  }

  onNavToggle(){
    this.isExpanded = !this.isExpanded;
    
    this.navToggleElement.nativeElement.style.display = this.navToggleElement.nativeElement.style.display == 'none' ? 'inline-block':'none'; 
  }

}
