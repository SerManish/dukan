import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})

export class PreloadGuard implements Resolve<any>{
    
    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore
    ){}
    
    resolve(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ){
        return new Promise(res=>{
            this.afAuth.authState.pipe(first()).subscribe(user=>{
                this.afs.collection('orders').doc(user.uid).collection('users-orders').get().pipe(first()).subscribe(doc=>{
                    res(doc);
                });
            });
        });  
    }
}