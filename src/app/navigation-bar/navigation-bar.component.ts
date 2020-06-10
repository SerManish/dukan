import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  isLoggedIn: boolean;
  
  constructor(
    private loginService: LoginService
  ) { }

  isModeLogin = this.loginService.isModeLogin;

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn;
  }

  onLogin(){
    this.isModeLogin.next(true);
  }

  onSignup(){
    this.isModeLogin.next(false);
  }

}
