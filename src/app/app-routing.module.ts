import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from './middleware/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'admin',
    canActivate : [AuthGuard],
    loadChildren : () => import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path : 'user',
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
