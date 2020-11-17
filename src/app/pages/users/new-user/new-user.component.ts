import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  sessionForm: FormGroup;

  photoUrl: any;

  userModel: UserModel = {
    documentUser: '',
    nameUser: '',
    lastnameUser: '',
    personalEmailUser: '',
    phoneUser: '',
    directionUser: '',
    emailUser: '',
    passwordUser: '',
    positionUser: '',
    rekognitionId: '',
    stateUser: "Activo"
  }

  constructor(public fb: FormBuilder) {
    this.sessionForm = this.fb.group({
      userForm: this.fb.group({
        documentUser: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(8)]],
        nameUser: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑÁÉÍÓÚáéíóú ]+$')]],
        lastnameUser: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑÁÉÍÓÚáéíóú ]+$')]],
        personalEmailUser: ['', [Validators.required, Validators.email]],
        phoneUser: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        directionUser: ['', [Validators.required]],
      }),
      emailUser: [{ value: '', disabled: true }],
      passwordUser: [{ value: '', disabled: true }],
      photoUser: ['', [Validators.required]],
      photoUrl: [this.photoUrl,[Validators.required]],
      positionUser: ['', [Validators.required]]
    })


  }

  ngOnInit(): void {

  }

  get f() { return this.sessionForm.controls }

  get v() { return this.sessionForm.controls.userForm['controls'] }


}
