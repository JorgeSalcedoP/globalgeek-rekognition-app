import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';
import { ArchwizardModule } from 'angular-archwizard';
import { JwtInterceptor } from './middleware/jwt-interceptor';
import { ErrorInterceptor } from './middleware/error-interceptor';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { RekognitionComponent } from './components/rekognition/rekognition.component';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterSessionComponent } from './components/register-session/register-session.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { ToastrModule } from 'ngx-toastr';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxImageCompressService } from 'ngx-image-compress';

import { ChangePasswordComponent } from './components/change-password/change-password.component';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthGuard } from './middleware/auth.guard';
import { NewAttendanceComponent } from './pages/attendance/new-attendance/new-attendance.component';
import { HeaderComponent } from './theme/layout/auth/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ListAttendanceComponent } from './pages/attendance/list-attendance/list-attendance.component';
Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    LoginComponent,
    SigninComponent,
    RekognitionComponent,
    ListUsersComponent,
    NewUserComponent,
    RegisterUserComponent,
    RegisterSessionComponent,
    EditUserComponent,
    ChangePasswordComponent,
    NotfoundComponent,
    NewAttendanceComponent,
    WelcomeComponent,
    HeaderComponent,
    ListAttendanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ArchwizardModule,
    ImageCropperModule,
    ToastrModule.forRoot(),
    WebcamModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    NavigationItem,
    NgxImageCompressService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
