import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  detectFaces(photoUser: any): any {
    return this.http.post(`${environment.apiUrl}/detectface`, photoUser);
  }

  putFace(photoUser: any): any {
    return this.http.post<any>(`${environment.apiUrl}/putimage`, photoUser);
  }

  signinPhoto(photoUser: any) {
    return this.http.post<any>(`${environment.apiUrl}/signinputphoto`, photoUser);
  }
}
