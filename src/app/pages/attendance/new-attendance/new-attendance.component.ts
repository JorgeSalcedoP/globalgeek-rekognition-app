import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { AttendanceModel } from 'src/app/model/attendance';
import { LoginModel } from 'src/app/model/login';
import { AttendanceService } from 'src/app/services/attendance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-attendance',
  templateUrl: './new-attendance.component.html',
  styleUrls: ['./new-attendance.component.scss']
})
export class NewAttendanceComponent implements OnInit {

  @ViewChild('stepper') stepper;

  formLogin: FormGroup;
  formAttendance: FormGroup;
  error: string = "";

  loginModel: LoginModel = {
    username: '',
    password: '',
    actualPassword: '',
    confirmPassword: '',
    newPassword: ''
  };

  attendanceModel : AttendanceModel = {
    documentUser : '',
    nameUser : '',
    scheduleUser : '',
    typeAttendance : ''
  }


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private attendanceService : AttendanceService
  ) {
    this.formAttendance = this.fb.group({
      documentUser: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(8)]],
      typeAction: ['', [Validators.required]]
    }),
      this.formLogin = this.fb.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],//Validators.pattern("^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$")
      })
  }

  ngOnInit(): void {
  }

  get f() { return this.formAttendance.controls }


  getUser() {
    this.error = "";
    this.userService.getUserInformation(this.formAttendance.value.documentUser, this.formAttendance.value.typeAction).subscribe(
      res => {
        var string = JSON.stringify(res);
        var json = JSON.parse(string);
        if (json.S === '0') {
          this.error = "El empleado no se encuentra registrado."
        } else if (json.S === '1') {
          this.error = `Usted ya registro su ${this.formAttendance.value.typeAction}`
        } else if(json.S === '2'){
          this.error = "Usted no ha registrado su entrada."
        }else{
          Auth.signIn(json.S).then(
            sigin => {
              this.setAttendance(json);
              this.loginModel.username = json.S;
              this.loginModel.password = this.formAttendance.value.documentUser;
              this.stepper.next();
            }
          ).catch(
            err => {
              console.error(err);
              this.error = err.message;
            }
          );
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  setAttendance(json){
    this.attendanceModel.documentUser = json.User.documentUser.S;
    this.attendanceModel.nameUser = json.User.nameUser.S + " " + json.User.lastnameUser.S;
    this.attendanceModel.scheduleUser = json.User.scheduleUser.S;
    this.attendanceModel.typeAttendance = this.formAttendance.value.typeAction;
    this.attendanceService.setAttendance(this.attendanceModel);
  }

}
