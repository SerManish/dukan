import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './shared/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private loginService: LoginService
  ){}

  title = 'Dukan';
  isLoginDialog: boolean = false;
  loginSub: Subscription;

  // takes login state from login service to initialize the app for logined and non logined users differently
  ngOnInit(){
    this.loginSub = this.loginService.isModeLogin.subscribe(
      (dialogState) => {
        if(!this.loginService.isLoggedIn && dialogState!=null)
          this.isLoginDialog = true;
      }
    );

    this.loginService.onClose.subscribe(
      () => {
        this.isLoginDialog = false;
      }
    );
  }

  ngOnDestroy(){
    this.loginSub.unsubscribe();
  }

}