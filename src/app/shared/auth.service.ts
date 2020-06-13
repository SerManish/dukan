import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore/';
import { auth } from 'firebase/app';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AlertService } from './alert-bar/alert.service';
import { take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class AuthService implements OnDestroy{

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  isLoggedIn = false;
  isAdmin = new BehaviorSubject<boolean>(false);
  afSub: Subscription;

    constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router,
      private alertService: AlertService
    ){
      this.afSub = this.afAuth.authState.subscribe( user => {
        this.user.next(user);
        this.isLoggedIn = !!user;
        if(!!user){
          this.afs.collection('users').doc(user.uid).get().pipe(take(1)).subscribe( doc=>{
            this.isAdmin.next(!!doc.data().isAdmin);
          });
        }
        else{
          this.isAdmin.next(false);
        }
      });
    }

    login(email: string, password: string){
        
      return this.afAuth.signInWithEmailAndPassword(email, password).then( ()=> {
        this.alertService.alert('login successful');
        return 0;
      })
      .catch( error=>{
        this.handleError(error);
      });
    }

    signup(email: string, password: string, name: string , gender: string){
      return this.afAuth.createUserWithEmailAndPassword( email, password).then( ()=>{
          this.alertService.alert('signup successful');
          const collection = this.afs.collection<User>('users');
          const data = {name: name, email: email, gender: gender, id: auth().currentUser.uid};
          collection.doc( auth().currentUser.uid ).set(data);
          return 0;
      })
      .catch( error=>{
        this.handleError(error);
      });
    }

    logout(){
        this.afAuth.signOut().then( ()=> {
        this.alertService.alert('logged out');
        this.user.next(null);
        this.router.navigate(['/home']);
      })
      .catch( error=>{
        this.handleError(error);
      });
    }

    
    handleError(error){
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
        
      switch(errorCode){
        case 'auth/email-already-in-use': 
          errorMessage = 'This email already exists !';
          break;
        case 'auth/invalid-email': 
          errorMessage = 'This email is invalid !';
          break;
        case 'auth/wrong-password': 
          errorMessage = 'Wrong Password !';
          break;
        case 'auth/user-not-found': 
        errorMessage = 'This email is not registered !';
        break;
      }
      this.alertService.alert(errorMessage, 'danger');  
      return 1;
    }
    
    ngOnDestroy(){
      this.afSub.unsubscribe();
    }

}