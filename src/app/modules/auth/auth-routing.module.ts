import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAttendanceComponent } from 'src/app/pages/attendance/list-attendance/list-attendance.component';
import { NewAttendanceComponent } from 'src/app/pages/attendance/new-attendance/new-attendance.component';
import { EditUserComponent } from 'src/app/pages/users/edit-user/edit-user.component';
import { ListUsersComponent } from 'src/app/pages/users/list-users/list-users.component';
import { NewUserComponent } from 'src/app/pages/users/new-user/new-user.component';
import { AdminComponent } from 'src/app/theme/layout/admin/admin.component';


const routes: Routes = [
  {
    path : '',
    component : AdminComponent,
    children : [
      {
        path : 'users',
        component : ListUsersComponent
      },
      {
        path : 'user/nuevo',
        component : NewUserComponent
      },
      {
        path : 'user/edit/:id',
        component : EditUserComponent
      },
      {
        path : 'control',
        component : ListAttendanceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
