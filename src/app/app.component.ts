import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dukan';
  isExpanded: boolean = false;

  onExpandToggle(expanded: boolean){
    this.isExpanded = expanded;
  }
}
