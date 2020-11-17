import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  @Input() userModel;
  public sessionForm: FormGroup;

  // Let Angular inject the control container
  constructor(private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.sessionForm = <FormGroup>this.controlContainer.control;
  }

  getData() {
    var emailUser = this.userModel.nameUser.split(" ")[0] + '.' + this.userModel.lastnameUser.split(" ")[0] + "@globalgeek.pe";
    this.sessionForm.controls['emailUser'].setValue(emailUser.toLowerCase());
    this.sessionForm.controls['passwordUser'].setValue(this.userModel.documentUser);
  }

  get f() { return this.sessionForm.controls }
  get v() { return this.sessionForm.controls.userForm['controls'] }


}
