import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  isLoggedIn: boolean;
  
  constructor(
    private loginService: LoginService,
    private router: Router
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

  onSearch(query:string){
    console.log('navigate');
    this.router.navigate(['productlist'], {fragment: query});
  }

}
