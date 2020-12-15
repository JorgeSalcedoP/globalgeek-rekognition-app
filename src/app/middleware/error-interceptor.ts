import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router,private userAuthService:UserAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var url = this.router.url.split('/')[1];
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 0 || err.status == 401) {
        if(url === 'admin'){
          this.authService.logout();
          this.router.navigate(['/login']);
        }else if(url === 'user'){
          this.userAuthService.logout();
          this.router.navigate(['/asistencia']);
        }
      }

      const error = err.error.message || err.statusText;

      return throwError(error);

    }))
  
  }
}
