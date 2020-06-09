import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class LoginService{

    isModeLogin = new Subject<boolean>();
    onClose = new Subject();
    constructor(){}
}