import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public formLogin: FormGroup;

  // Let Angular inject the control container
  constructor(private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.formLogin = <FormGroup>this.controlContainer.control;
  }

  get f () { return this.formLogin.controls }


}
