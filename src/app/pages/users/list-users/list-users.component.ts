import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: any = [];

  constructor() { }

  ngOnInit(): void {
    this.users = [
      {
        directionUser: "SJM",
        documentUser: "73570250",
        emailUser: "jorge.salcedo@globalgeek.pe",
        lastnameUser: "Salcedo Prado",
        nameUser: "Jorge Luis",
        passwordUser: "PruebaSoftware2020*",
        personalEmailUser: "abc@gmail.com",
        phoneUser: "972093945",
        positionUser: "Administrador",
        rekognitionId: ""
      },
      {
        directionUser: "SURCO",
        documentUser: "08254521",
        emailUser: "jorge.prado@globalgeek.pe",
        lastnameUser: "Prado Prado",
        nameUser: "Jorge",
        passwordUser: "PruebaSoftware2020*",
        personalEmailUser: "abc2@gmail.com",
        phoneUser: "972093945",
        positionUser: "Almacenero",
        rekognitionId: ""
      }
    ]
  }

}
