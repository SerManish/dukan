import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userSub: Subscription;
  
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userSub = this.authService.user.subscribe( (user) => {
      this.isLoggedIn = !!user;
    });

    this.authService.isAdmin.subscribe(isAdmin=>{
      this.isAdmin = isAdmin;
    })
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

  onLogout(){
    this.authService.logout();
  }

  onSearch(query:string){
    // console.log('navigate');
    if(query.trim()!='')
      this.router.navigate(['productlist'], {fragment: query.trim()});
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
