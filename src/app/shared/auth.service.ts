import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore/';
import { auth } from 'firebase/app';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthService implements OnDestroy{

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  afSub: Subscription;

    constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router
    ){
      this.afSub = this.afAuth.authState.subscribe( user => {
        if(user){
          this.user.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        }
        else{
          localStorage.setItem('user', null);
        }
        // console.log('user',user);
      });
    }

    async login(email: string, password: string){
        
      return await this.afAuth.signInWithEmailAndPassword(email, password).then( ()=> {
        alert('login successful');
        return 0;
      })
      .catch((error)=> {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        return 1;
      });
    }

    async signup(email: string, password: string, name: string , gender: string){
      return await this.afAuth.createUserWithEmailAndPassword( email, password).then( ()=>{
          alert('signup successful');
          const collection = this.afs.collection<User>('users');
          const data = {name: name, email: email, gender: gender, id: auth().currentUser.uid};
          collection.doc( auth().currentUser.uid ).set(data);
          return 0;
      })
      .catch( (error)=> {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        return 1;
      });
    }

    async logout(){
      await this.afAuth.signOut().then( ()=> {
        alert('logged out');
        this.user.next(null);
        this.router.navigate(['/home']);
      })
      .catch( (error)=> {
        // Handle Errors here.
        // let errorCode = error.code;
        // let errorMessage = error.message;
        // if (errorCode == 'auth/weak-password') {
        //   alert('The password is too weak.');
        // } else {
        //   alert(errorMessage);
        // }
        console.log(error);
      });
    }

    ngOnDestroy(){
      this.afSub.unsubscribe();
    }
}