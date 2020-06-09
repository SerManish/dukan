import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  isLoggedIn: boolean = !true;
  
  constructor(
    private loginService: LoginService
  ) { }

  isModeLogin = this.loginService.isModeLogin;

  ngOnInit(): void {
  }

  onLogin(){
    this.isModeLogin.next(true);
  }

  onSignup(){
    this.isModeLogin.next(false);
  }

}
