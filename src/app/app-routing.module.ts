import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './middleware/auth.guard';
import { UserGuard } from './middleware/user.guard';
import { NewAttendanceComponent } from './pages/attendance/new-attendance/new-attendance.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
const routes: Routes = [
  {
    path : '',
    redirectTo : 'asistencia',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'asistencia',
    component : NewAttendanceComponent
  },
  {
    path : 'admin',
    canActivate : [AuthGuard],
    loadChildren : () => import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path : 'user',
    canActivate : [UserGuard],
    loadChildren : () => import('./modules/user/user.module').then(m=>m.UserModule)
  },
  {
    path : '**',
    component : NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
