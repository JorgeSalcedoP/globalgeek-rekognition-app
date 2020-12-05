import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: any = [];

  currentUser:string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    Auth.currentUserInfo().then(
      user => {
        this.currentUser = user.attributes['custom:document'];
      }
    ).catch();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  deleteUser(userModel: any) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro de borrar el usuario  ${userModel.documentUser.S}`,
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.userService.deleteUser(userModel).subscribe(
          res => {
            console.log(res);
            Swal.fire({
              title: 'Eliminado',
              text: `El usuario ${userModel.documentUser.S} fue Eliminado`,
              type: 'success',
            });
            this.getUsers();
          },
          err => {
            Swal.fire({
              title: 'Error!',
              text: `El usuario ${userModel.documentUser.S} no fue Eliminado`,
              type: 'error',
            });
            console.error(err)
          }
        );
      }
    });
  }

}
