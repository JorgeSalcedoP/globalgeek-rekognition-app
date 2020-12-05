import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})

export class JwtInterceptor implements HttpInterceptor {

  token : string = "";
  tokenUser : string = "";

  constructor(private authService: AuthService,private userAuthService:UserAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem("token")!=null){
      this.token = localStorage.getItem("token").replace(/['"]+/g, '');
    }
    
    if(localStorage.getItem("tokenUser")!=null){
      this.tokenUser = localStorage.getItem("tokenUser").replace(/['"]+/g, '');
    }

    console.log(this.token);
    console.log(this.tokenUser);
    
    if(this.token){
      req = req.clone({
        setHeaders : {
          Authorization : this.token
        }
      });
    }else if(this.tokenUser){
      req = req.clone({
        setHeaders : {
          Authorization : this.tokenUser
        }
      });
    }

    return next.handle(req);
  }
}
