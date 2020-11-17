import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AuthService } from 'src/app/services/auth.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  @Input() loginModel;
  @Input() stepper;
  @Output() newPasswordEvent = new EventEmitter<boolean>();
  
  public formLogin: FormGroup;
  isError: boolean = false;

  constructor(private controlContainer: ControlContainer, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.formLogin = <FormGroup>this.controlContainer.control;
  }

  get f() { return this.formLogin.controls }

  signin() {
    this.isError = false;
    this.authService.login(this.loginModel).then(
      user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.newPasswordEvent.emit(true);
        }else{
          this.stepper.next();
        }
      }
    ).catch(
      err => {
        this.isError = true;
        console.log(err);
      }
    );
  }





}
