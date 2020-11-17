import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../model/user.model';
import {Auth} from "aws-amplify";
import { LoginModel } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : any ;
  token: string;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http:HttpClient,
    private router: Router
    ) {
      if(localStorage.getItem("token")){
        this.token = JSON.parse(localStorage.getItem("token"));
        this.user = jwt_decode(localStorage.getItem("token"))
      }
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
      this.currentUser = this.currentUserSubject.asObservable();
    }

    setToken(user:any){
      localStorage.setItem('token',JSON.stringify(user.signInUserSession.idToken.jwtToken));
      this.currentUserSubject.next(user);
      this.user = jwt_decode(user.signInUserSession.idToken.jwtToken);
    }

    logout( user = "admin") : void {
      localStorage.removeItem("token");
      this.currentUserSubject.next(null);
      this.user = null ;
      this.token = null;
    }

    login(loginModel:LoginModel){
      return Auth.signIn(loginModel.username,loginModel.password);
    }


}
