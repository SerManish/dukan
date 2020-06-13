import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AlertService } from './alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.css']
})
export class AlertBarComponent implements OnInit, OnDestroy {

  message: string = '';
  @ViewChild('alertBar') alertBar; 
  alertSub: Subscription;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertSub = this.alertService.sendAlert.subscribe( alert=>{
      if(alert.message!=null && alert.message!=''){
        this.message=alert.message;
        if(alert.type=='danger'){
          this.alertBar.nativeElement.style.backgroundColor='red';
        }
        else{
          this.alertBar.nativeElement.style.backgroundColor='green';
          this.close(alert.duration);
        }
        this.alertBar.nativeElement.style.display='block';
      }
    });
  }

  close(alertDuration){
    setTimeout(() =>{
      this.alertBar.nativeElement.style.display='none';

    }, alertDuration);
  }

  ngOnDestroy(){
    this.alertSub.unsubscribe();
  }

}
