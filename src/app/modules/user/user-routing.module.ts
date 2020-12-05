import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { AuthComponent } from './../../theme/layout/auth/auth.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  {
    path : '',
    component : AuthComponent,
    children : [
      {
        path : '', redirectTo : 'welcome' , pathMatch : 'full'
      },
      {
        path : 'welcome' , component : WelcomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
