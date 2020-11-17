import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage, Predictions, Auth } from 'aws-amplify';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rekognition',
  templateUrl: './rekognition.component.html',
  styleUrls: ['./rekognition.component.scss']
})
export class RekognitionComponent implements OnInit {

  @Input() loginModel;
  public formLogin: FormGroup;

  isValid: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private imageService: ImageService,
    private authService: AuthService,
    private controlContainer: ControlContainer,
  ) { }

  photoUser: any = {
    file: '',
    name: '',
    type: '',
    size: 0,
    dni: ''
  }
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  ngOnInit(): void {
    this.formLogin = <FormGroup>this.controlContainer.control;
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.isValid = true;
    this.loading = true;
    this.showWebcam = false;
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.webcamImage = null;
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.photoUser = {
      file: ";" + "," + this.webcamImage.imageAsBase64,
      type: "image/jpeg",
      name: this.loginModel.username + ".jpg"
    }
    this.imageService.detectFaces(this.photoUser).subscribe(
      res => {
        var json_string = JSON.stringify(res);
        var json = JSON.parse(json_string);
        if (json.FaceDetails.length == 0) {
          this.toggleWebcam();
          Swal.fire({
            title: 'Rostro no encontrado',
            text: 'Por favor, asegurese de estar frente a la cámara',
            type: 'error'
          });
        } else if (json.FaceDetails.length > 1) {
          this.toggleWebcam();
          Swal.fire({
            title: 'Rostros encontrados',
            text: 'Por favor, solo debe existir un indiviudo en la cámara',
            type: 'warning'
          });
        } else {
          this.isValid = false;
          this.loading = false;
        }
      },
      err => console.error(err)
    );
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  customChallenge() {
    this.isValid = true;
    this.loading = true;
    Auth.signOut({ global: true });
    this.imageService.signinPhoto(this.photoUser).subscribe(
      photo => {
        Auth.signIn(this.loginModel.username).then(
          user => {
            Auth.sendCustomChallengeAnswer(user, photo.Key).then(
              sigin => {
                this.authService.setToken(sigin);
                this.router.navigate(['/admin']);
              }
            ).catch(
              err => {
                this.webcamImage = null;
                this.showWebcam = true;
                console.error(err);
              }
            );
          }
        ).catch(
          err => {
            this.webcamImage = null;
            this.showWebcam = true;
            console.error(err);
          }
        );
      },
      err => {
        this.webcamImage = null;
        this.showWebcam = true;
        console.error(err);
      }
    );

  }

}
