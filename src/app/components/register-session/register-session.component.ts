import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-register-session',
  templateUrl: './register-session.component.html',
  styleUrls: ['./register-session.component.scss']
})
export class RegisterSessionComponent implements OnInit {
  
  @Input() userModel;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  public sessionForm: FormGroup;
  photoUrl: any = '';
  isPhoto : boolean = false;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.sessionForm = <FormGroup>this.controlContainer.control;
  }

  get f() { return this.sessionForm.controls }
  get v() { return this.sessionForm.controls.userForm['controls'] }

  imagesPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.photoUrl = _event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fileChangeEvent(event: any): void {
    this.sessionForm.controls['photoUrl'].setValue('');
    this.isPhoto = true;
    this.photoUrl = "";
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {

    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {

  }
  loadImageFailed() {
    // show message
  }

  setPhoto() {
    this.photoUrl = this.croppedImage;
    this.sessionForm.controls['photoUrl'].setValue(this.photoUrl);
  }

  getValue(){
    console.log(this.userModel);
  }
}
