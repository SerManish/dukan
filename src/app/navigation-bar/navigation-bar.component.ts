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
	isChecked = false;
	userSub: Subscription;//subscribe to the User data
	adminSub: Subscription;//subscribe to check whether current user is an admin 
	checkSub: Subscription;

	/*	
		checks whether the user was logged in.
		checks whether the user is an admin.
	*/
	constructor(
		private loginService: LoginService,
		private authService: AuthService,
		private router: Router
	) {
		this.userSub = this.authService.user.subscribe((user) => {
			this.isLoggedIn = !!user;
		});

		this.adminSub = this.authService.isAdmin.subscribe(isAdmin => {
			this.isAdmin = isAdmin;
		})

		this.checkSub = this.authService.isChecked.subscribe(data => {
			this.isChecked = data;
		});
	}

	isModeLogin = this.loginService.isModeLogin;//login service's ismodelogin attribute is used to check if current authentication mode is login/signup

	ngOnInit(): void {
		this.isLoggedIn = this.loginService.isLoggedIn;
	}

	//	moves authentication form to login side
	onLogin() {
		this.isModeLogin.next(true);
	}

	//	moves authentication form to signup side
	onSignup() {
		this.isModeLogin.next(false);
	}

	// logs out the user
	onLogout() {
		this.authService.logout();
	}

	//	adds the search query to the route fragment
	onSearch(query: string) {
		if (query.trim() != '')
			this.router.navigate(['productlist'], { fragment: query.trim() });
	}

	ngOnDestroy() {
		this.userSub.unsubscribe();
		this.adminSub.unsubscribe();
	}

}
