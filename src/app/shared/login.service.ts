import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class LoginService {

	//all below variables used in multiple components to show authentication dialog
	//also switch authentication mode (login/signup)
	isLoggedIn: boolean = false;
	isModeLogin = new BehaviorSubject<boolean>(null);
	onClose = new Subject();
	constructor() { }

}