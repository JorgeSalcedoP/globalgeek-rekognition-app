import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup;

  constructor(public fb:FormBuilder) {
    this.formLogin = this.fb.group({
      username : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.pattern("^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$")]]
    })
  }

  ngOnInit(): void {
  }

}
