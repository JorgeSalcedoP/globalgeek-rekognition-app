import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/model/login';
import { MustMatch } from '../../helpers/must-match';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  changePasswordForm:FormGroup;

  loginModel: LoginModel = {
    username: '',
    password: '',
    actualPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  isResetPassword: boolean = false;


  constructor(public fb: FormBuilder) {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],//Validators.pattern("^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$")
    }),
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\[\]"\';:_\-<>\., =\+\/\\]).{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\[\]"\';:_\-<>\., =\+\/\\]).{8,}$/)]]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    })
  }

  ngOnInit(): void {
  }

  get f() { return this.formLogin.controls }

  showNewPassword(value:boolean){
    this.isResetPassword = value;
  }

}
