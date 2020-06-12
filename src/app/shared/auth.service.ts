import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore/';
import { auth } from 'firebase/app';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthService implements OnDestroy{

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  afSub: Subscription;
  sendAlert: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router
    ){
      this.afSub = this.afAuth.authState.subscribe( user => {
        this.user.next(user);
        // console.log('user',user);
      });
    }

    login(email: string, password: string){
        
      return this.afAuth.signInWithEmailAndPassword(email, password).then( ()=> {
        this.sendAlert.next('login successful');
        return 0;
      })
      .catch( this.handleError);
    }

    signup(email: string, password: string, name: string , gender: string){
      return this.afAuth.createUserWithEmailAndPassword( email, password).then( ()=>{
          this.sendAlert.next('signup successful');
          const collection = this.afs.collection<User>('users');
          const data = {name: name, email: email, gender: gender, id: auth().currentUser.uid};
          collection.doc( auth().currentUser.uid ).set(data);
          return 0;
      })
      .catch( this.handleError);
    }

    logout(){
        this.afAuth.signOut().then( ()=> {
        this.sendAlert.next('logged out');
        this.user.next(null);
        this.router.navigate(['/home']);
      })
      .catch( this.handleError);
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
      
      console.log(error);
      this.sendAlert.next(errorMessage);
      return 1;
    }
    
    ngOnDestroy(){
      this.afSub.unsubscribe();
    }

}