import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  getAttendances(){
    return this.http.get(`${environment.apiUrl}/attendance`);
  }

  setAttendance(attendance){
    var attendance_string = JSON.stringify(attendance);
    localStorage.setItem("attendance",attendance_string);
  }

  getAttendance(){
    let attendance_string = localStorage.getItem("attendance");
    if(!isNullOrUndefined(attendance_string)){
      let attendance = JSON.parse(attendance_string);
      return attendance;
    }else{
      return null;
    }
  }

  removeAttendance(){
    localStorage.removeItem("attendance");
  }

  putAttendance(attendance){
    return this.http.post(`${environment.apiUrl}/attendance/employee`,attendance);
  }
  
}
