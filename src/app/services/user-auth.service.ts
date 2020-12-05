import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { LoginModel } from '../model/login';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  userUser : any ;
  tokenUser: string;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http:HttpClient,
    private router: Router
    ) {
      if(localStorage.getItem("tokenUser")){
        this.tokenUser = JSON.parse(localStorage.getItem("tokenUser"));
        this.userUser = jwt_decode(localStorage.getItem("tokenUser"))
      }
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem("tokenUser")));
      this.currentUser = this.currentUserSubject.asObservable();
    }

    setToken(user:any){
      localStorage.setItem("tokenUser",JSON.stringify(user.signInUserSession.idToken.jwtToken));
      this.currentUserSubject.next(user);
      this.userUser = jwt_decode(user.signInUserSession.idToken.jwtToken);
    }

    logout() : void {
      localStorage.removeItem("tokenUser");
      this.currentUserSubject.next(null);
      this.userUser = null ;
      this.tokenUser = null;
    }
}
