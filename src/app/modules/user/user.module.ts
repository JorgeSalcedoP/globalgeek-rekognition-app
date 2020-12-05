import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RekognitionComponent } from 'src/app/components/rekognition/rekognition.component';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
