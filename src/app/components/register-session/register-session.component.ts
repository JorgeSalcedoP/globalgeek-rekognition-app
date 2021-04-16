import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserModel } from 'src/app/model/user.model';
import Amplify, { Auth, Storage, Predictions } from 'aws-amplify';
import { ImageService } from 'src/app/services/image.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ActivatedRoute, Router } from '@angular/router';

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
  isPhoto: boolean = false;
  arrayPosition : any = [];
  arraySchedule : any = [];
  

  photoUser: any = {
    file: '',
    name: '',
    type: '',
    size: 0,
    dni: '',
    url: 'session'
  }

  constructor(
    private controlContainer: ControlContainer,
    private imageService: ImageService,
    private userService: UserService,
    private imageCompress: NgxImageCompressService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.sessionForm = <FormGroup>this.controlContainer.control;
  }

  get f() { return this.sessionForm.controls }
  get v() { return this.sessionForm.controls.userForm['controls'] }

  fileChangeEvent(event: any): void {
    var file = event.target.files[0];
    if (file.type === 'image/jpeg') {
      this.photoUser.type = file.type;
      this.photoUser.size = file.size;
      this.isPhoto = true;
      this.photoUrl = "";
      this.imageChangedEvent = event;
    } else {
      this.imageChangedEvent = null;
    }

  }
  imageCropped(event: ImageCroppedEvent) {
    this.photoUser.file = event.base64;
    this.isPhoto = false;
    this.imageService.detectFaces(this.photoUser).subscribe(
      res => {
        var json_string = JSON.stringify(res);
        var json = JSON.parse(json_string);
        if (json.StatusCode == 404) {
          Swal.fire({
            title: 'Rostro no encontrado',
            text: 'Por favor, seleccione una imagen que contenga un rostro en ella.',
            type: 'error'
          })
        } else if (json.StatusCode == 255) {
          Swal.fire({
            title: 'Rostros encontrados',
            text: 'Por favor, seleccione una imagen que contenga solo un rostro en ella.',
            type: 'warning'
          })
        } else if (json.StatusCode == 239) {
          Swal.fire({
            title: 'Rostro registrado',
            text: 'El rostro ya fue registrado, seleccione una imagen diferente',
            type: 'warning'
          })
        } else {
          this.croppedImage = event.base64;
          this.photoUser.file = event.base64;
          this.isPhoto = true;
        }
      },
      err => {
        console.error(err);
      }
    );


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

  validateSize(file) {
    if (file.size > 100000) {
      this.imageCompress.compressFile(this.photoUser.file, 1, 50, 50).then(
        res => {
          this.photoUser.file = res;
        }
      ).catch(
        err => {
          console.error(err);
        }
      );
    }
  }

  getValue() {
    this.photoUser.dni = this.userModel.documentUser;
    this.photoUser.name = this.userModel.documentUser + ".jpg";
    this.validateSize(this.photoUser);

    this.imageService.putFace(this.photoUser).subscribe(
      photo => {
        this.userService.signUp(this.userModel).subscribe(
          res => {
            var json_string = JSON.stringify(res);
            var json = JSON.parse(json_string);
            if (json.StatusCode == 200) {
              this.userService.createUser(this.userModel).subscribe(
                user => {
                  if (user.Attributes) {
                    Swal.fire({
                      title: "Registrado!",
                      text: "Usuario " + this.userModel.documentUser + " agregado correctamente.",
                      type: "success"
                    });
                    this.router.navigate(['../../users'], { relativeTo: this.activeRoute });
                  }
                },
                err => {
                  Swal.fire({
                    title: "Error!",
                    text: "Usuario " + this.userModel.documentUser + " no agregado.",
                    type: "error"
                  });
                }
              );
            } else {
              Swal.fire({
                title: "Error!",
                text: "Usuario " + this.userModel.documentUser + " no agregado.",
                type: "error"
              });
            }

          },
          err => {
            Swal.fire({
              title: "Error!",
              text: "Usuario " + this.userModel.documentUser + " no agregado.",
              type: "error"
            });
            console.error(err);
          }
        );
      },
      err => {
        console.error(err);
      }
    );

  }

  getData(){
    this.arrayPosition = JSON.parse(localStorage.getItem("PositionUser"));
    this.arraySchedule = JSON.parse(localStorage.getItem("ScheduleUser"));
  }

}
