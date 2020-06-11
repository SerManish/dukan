import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  isLoggedIn: boolean = false;
  
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    
  }

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
    // console.log('navigate');
    if(query.trim()!='')
      this.router.navigate(['productlist'], {fragment: query});
  }

}
