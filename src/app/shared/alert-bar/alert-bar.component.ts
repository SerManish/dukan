import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.css']
})
export class AlertBarComponent implements OnInit {

  message: string = '';
  @ViewChild('alertBar') alertBar; 

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.sendAlert.subscribe((msg)=>{
      if(msg!=null && msg!=''){
        this.message=msg;
        this.alertBar.nativeElement.style.display='block';
      }
    });
  }

}
