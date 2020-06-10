import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  authForm: FormGroup;
  isLoginMode = false;
  isLoading = false;
  genders: string[] = ['Male', 'Female'];
  error: string = null;
  loginSub: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router  
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'userData':  new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      }),
      'name': new FormControl(null, [Validators.required]), 
      'gender': new FormControl(null)
    });
    
    this.loginSub = this.loginService.isModeLogin.subscribe(
      isModeLogin => {
        this.isLoginMode = isModeLogin;
      }
    );
  }

  switchToLogin(isLogin: boolean){
    this.authForm.reset();
    this.isLoginMode = isLogin;
  }

  onClose(){
    this.loginService.onClose.next();
  }

  ngOnDestroy(){
    this.loginSub.unsubscribe();
  }


  onSubmit(){
    //console.log(this.authForm);
    // if(!form.valid){
    //   return;
    // }

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
