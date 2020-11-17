import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editForm : FormGroup;

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
    stateUser: '',
  };

  constructor(
    private userService: UserService,
    private activeRoute :  ActivatedRoute,
    private fb:FormBuilder,
    private router : Router,
  ) {
    this.editForm = this.fb.group({
      documentUser : [{value : '', disabled : true}],
      nameUser : ['',[Validators.required]],
      lastnameUser: ['',[Validators.required]],
      personalEmailUser : ['',[Validators.required]],
      phoneUser : ['',[ Validators.required, Validators.pattern('[0-9]*')]],
      directionUser : ['',[Validators.required]],
      positionUser : ['',[Validators.required]],
      // stateUser : ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    var id = this.activeRoute.snapshot.params.id;
    console.log(this.activeRoute.snapshot);
    this.getUser(id);
  }

  get e() { return this.editForm.controls };

  getUser(documentUser:string){
    if(documentUser){
      this.userService.getUser(documentUser).subscribe(
        res => {
          this.userModel.documentUser  = res.documentUser.S;
          this.userModel.nameUser = res.nameUser.S;
          this.userModel.lastnameUser = res.lastnameUser.S;
          this.userModel.personalEmailUser = res.personalEmailUser.S;
          this.userModel.phoneUser = res.phoneUser.S;
          this.userModel.directionUser = res.directionUser.S;
          this.userModel.stateUser = res.stateUser.S;
          this.userModel.positionUser = res.positionUser.S;
          this.userModel.emailUser = res.emailUser.S;
        },
        err => {
          console.log(err);
        }
      );
    }
  }


  updateUser() {
    this.userService.updateUser(this.userModel).subscribe(
      res => {
        console.log(res);
        Swal.fire({
          title : 'Actualizado!',
          text : `Usuario ${this.userModel.documentUser} actualizado!`,
          type : 'success'
        });
        this.router.navigate(['../../../users'], {relativeTo: this.activeRoute});
      },
      err => {
        console.error(err);
        Swal.fire({
          title : 'Error!',
          text : `Usuario ${this.userModel.documentUser} no actualizado!`,
          type : 'error'
        });
      }
    );
  }

}
