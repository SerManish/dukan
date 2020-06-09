import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ){}

  title = 'dukan';
  isLoginDialog: boolean = false;

  ngOnInit(){
    this.loginService.isModeLogin.subscribe(
      () => {
        this.isLoginDialog = true;
      }
    );

    this.loginService.onClose.subscribe(
      () => {
        console.log('close');
        this.isLoginDialog = false;
      }
    );
  }
  

}
