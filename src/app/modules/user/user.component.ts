import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  formAttendance : FormGroup;

  constructor(private fb:FormBuilder) { 
    this.formAttendance = this.fb.group({
      documentUser : ['',[Validators.required]],
      typeAction : ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  get f() { return this.formAttendance.controls  }



}
