import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { Auth } from "aws-amplify";
import { Storage } from "aws-amplify";
import { UserAuthService } from 'src/app/services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  userModel: UserModel = {
    documentUser: "",
    nameUser: "",
    lastnameUser: "",
    directionUser: "",
    emailUser: "",
    personalEmailUser: "",
    passwordUser: "",
    phoneUser: "",
    positionUser: "",
    rekognitionId: "",
    scheduleUser: "",
    stateUser: ""
  }

  date: any;

  photoUser: any;

  constructor(public router: Router, private userAuthService: UserAuthService) { }

  ngOnInit(): void {

    Auth.currentUserInfo().then(
      res => {
        this.userModel.nameUser = res.attributes.name,
          this.userModel.positionUser = res.attributes['custom:position'];
        this.userModel.documentUser = res.attributes['custom:document'];
        this.date = Date.now();
        Storage.get(res.attributes['custom:document'] + ".jpg").then(
          photo => {
            this.photoUser = photo;
          }
        );
      }
    ).catch(
      err => {
        this.userAuthService.logout();
        console.error(err);
      }
    );

    this.logout();
  }


  logout() {
    Swal.fire({
      type: 'success',
      title: 'Asistencia Registrada',
      showConfirmButton: false,
      timer: 2000
    });
    setTimeout(() => {
      this.userAuthService.logout();
      this.router.navigate(['/asistencia']);
    }, 5000);
  }




}
