import { Injectable } from '@angular/core';
import { UserLogin } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { LOGINURL } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Need BehaviorSubject to broadcast this information through the app
  public userDataChanged = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) { 
    
  }

  authenticateUser(userLoginData: UserLogin): Observable<any> {
    return this.http.post(LOGINURL, userLoginData);
  }

  setUserData(userData) {
    this.userDataChanged.next(userData);
  }

  forgetPassword(email: string) {
    // To-Do
    return of(1, 2, 3, 4, 5);
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
}
