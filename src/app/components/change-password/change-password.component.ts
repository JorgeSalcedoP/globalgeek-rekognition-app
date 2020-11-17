import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @Input() firsTime;
  @Input() stepper;
  @Input() loginModel;
  public changePasswordForm:FormGroup;

  constructor(private controlContainer: ControlContainer,private fb: FormBuilder, private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.changePasswordForm = <FormGroup>this.controlContainer.control;
  }

  get c() { return this.changePasswordForm.controls }

  changePassword() {
    Auth.signIn(this.loginModel.username, this.loginModel.password).then(
      user => {
        Auth.completeNewPassword(user, this.loginModel.newPassword, { email: this.loginModel.username }).then(
          new_user => {
            Auth.signOut({global : true});
            location.reload(true);
          }
        ).catch(err => {
          console.error(err);
        });
      }
    ).catch(
      err => {
        console.error(err);
      }
    );
  }

}
