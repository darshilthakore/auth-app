import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public firebase: AngularFireAuth,
    public router: Router) { }


  // creating new user
  createUser(email, password) {
    return this.firebase.createUserWithEmailAndPassword(email, password);
  }

  //logging in the user
  loginUser(email, password) {
    return this.firebase.signInWithEmailAndPassword(email, password);
  }

  //retrieving the allowed users list from the path
  getUsersInfo(): Observable<any>{
    return this.http.get<any>('assets/users.json');
  }

  //logging out the user
  logoutUser() {
    return this.firebase.signOut().then( () => {
      localStorage.removeItem('user');
      this.router.navigate(['/user']);
    })
  }

}
