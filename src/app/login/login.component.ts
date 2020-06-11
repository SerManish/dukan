import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../shared/login.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';

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
    private authService: AuthService,
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
    let email = this.authForm.get('userData').get('email').value;
    let password = this.authForm.get('userData').get('password').value;
    if(this.isLoginMode){
      this.authService.login(email, password);
    }
    else{
      let name = this.authForm.get('name').value;
      let gender = this.authForm.get('gender').value;
      this.authService.signup(email, password, name , gender);
    }    
  }

}
