import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore/';
import { auth } from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthService{

    constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router
    ){
      
    }

    login(email: string, password: string){
        
      this.afAuth.signInWithEmailAndPassword(email, password).then( ()=> {
        console.log('login successful');
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
      });
    }

    signup(email: string, password: string, name: string , gender: string){
      this.afAuth.createUserWithEmailAndPassword( email, password).then( ()=>{
          console.log('signed up');
          const collection = this.afs.collection<User>('users');
          const data = {name: name, email: email, gender: gender, id: auth().currentUser.uid};
          collection.doc( auth().currentUser.uid ).set(data).then( () => {
          })
          .catch( (error)=>{
            console.log(error);
          });
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
      });
    }

    logout(){
      this.afAuth.signOut().then( ()=> {
        console.log('logout');
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
}