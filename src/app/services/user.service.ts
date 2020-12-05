import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): any {
    return this.http.get<any>(`${environment.apiUrl}/users`);
  }

  signUp(userModel: UserModel): any {
    return this.http.post(`${environment.apiUrl}/users/signup`, userModel);
  }

  getUser(documentUser: string): any {
    return this.http.get(`${environment.apiUrl}/users/user/${documentUser}`);
  }

  deleteUser(userModel:any): any {
    return this.http.post(`${environment.apiUrl}/users/signout`,userModel);
  }

  createUser(userModel: UserModel): any {
    return this.http.post(`${environment.apiUrl}/users`, userModel);
  }

  updateUser(userModel: UserModel): any {
    return this.http.post<UserModel>(`${environment.apiUrl}/users/user`, userModel);
  }

  getUserInformation(documentUser:string,typeAction:string){
    let param1 =  new HttpParams().set("documentUser",documentUser).set("typeAction",typeAction);
    return this.http.get(`${environment.apiUrl}/attendance/employee`,{responseType:"json",params:param1});
  }

}
