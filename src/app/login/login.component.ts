import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode = false;
  isLoading = false;
  error: string = null;

  constructor(
    private router: Router  
  ) { }

  ngOnInit(): void {
  }

  switchToLogin(isLogin: boolean){
    this.isLoginMode = isLogin;
  }


  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }

    // let authObs: Observable<AuthResponseData>;

    // const email = form.value.email;
    // const password = form.value.password;

    // this.isLoading = true;
    // this.error = null;
    // if(this.isLoginMode){
    //   authObs = this.authService.login(email, password);
    // }
    // else{
    //   authObs = this.authService.signUp(email, password);
    // }

    // authObs.subscribe(
    //   responseData => {
    //     console.log('Authentication successful', responseData);
    //     this.isLoading = false;
    //     this.router.navigate(['/firebase']);
    //   },
    //   errorMsg => {
    //     console.log('error occured : ',errorMsg);
    //     this.error = errorMsg;
    //     this.isLoading = false;
    //   }
    // );

    // form.reset();
    
  }

}
