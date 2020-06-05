import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @ViewChild('navToggle') navToggleElement: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onNavToggle(){
    this.navToggleElement.nativeElement.style.display = this.navToggleElement.nativeElement.style.display == '' ? 'inline-block':''; 
  }

}
