import { Component, OnInit, OnDestroy } from '@angular/core';
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

	authForm: FormGroup;//reactive form
	isLoginMode = false;//whether login/signup
	isLoading = false;
	genders: string[] = ['Male', 'Female'];
	loginSub: Subscription;

	constructor(
		private loginService: LoginService,
		private authService: AuthService,
	) { }

	//initialize reactive form
	//login or signup mode is listened fired from other component
	ngOnInit(): void {
		this.authForm = new FormGroup({
			'userData': new FormGroup({
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

	//resets form and switches to login dialog
	switchToLogin(isLogin: boolean) {
		this.authForm.reset();
		this.isLoginMode = isLogin;
	}

	//closes the authentication dialog
	onClose() {
		this.loginService.onClose.next();
	}

	//disables the submit button
	//extract user data from form
	//send user data to authservice for login/signup
	//
	async onSubmit() {
		this.isLoading = true;
		let email = this.authForm.get('userData').get('email').value;
		let password = this.authForm.get('userData').get('password').value;
		let result;
		if (this.isLoginMode) {
			result = await this.authService.login(email, password);
		}
		else {
			let name = this.authForm.get('name').value;
			let gender = this.authForm.get('gender').value;
			result = await this.authService.signup(email, password, name, gender);
		}
		this.isLoading = false;
		if (result == 0) {
			this.onClose();
		}
	}

	ngOnDestroy() {
		this.loginSub.unsubscribe();
	}

}
