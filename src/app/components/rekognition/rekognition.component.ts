import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage, Predictions, Auth, JS } from 'aws-amplify';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AttendanceService } from 'src/app/services/attendance.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rekognition',
  templateUrl: './rekognition.component.html',
  styleUrls: ['./rekognition.component.scss']
})
export class RekognitionComponent implements OnInit {

  @Input() loginModel;
  @Input() action;
  public formLogin: FormGroup;

  isValid: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private imageService: ImageService,
    private authService: AuthService,
    private controlContainer: ControlContainer,
    private userAuthService: UserAuthService,
    private attendanceService: AttendanceService
  ) { }

  photoUser: any = {
    file: '',
    name: '',
    type: '',
    size: 0,
    dni: '',
    url : 'validate'
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
      name: this.loginModel.username + ".jpg",
      url : 'validate'
    }
    console.log(this.photoUser);
    this.imageService.detectFaces(this.photoUser).subscribe(
      res => {
        console.log(res);
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
    Auth.signOut();
    this.imageService.signinPhoto(this.photoUser).subscribe(
      photo => {
        Auth.signIn(this.loginModel.username).then(
          async user => {
            console.log(user);
            await Auth.sendCustomChallengeAnswer(user, photo.Key).then(
              sigin => {
                console.log(sigin);
                var json_string = JSON.stringify(sigin);
                var json = JSON.parse(json_string);
                console.log(json.attributes["custom:position"]);
                if (this.action === 'attendance') {
                  this.userAuthService.setToken(sigin);
                  this.putAttendance();
                } else {
                  this.authService.setToken(sigin);
                  this.router.navigate(['/admin']);
                }
              }
            ).catch(
              err => {
                console.error(err);
                Swal.fire({
                  title : "Usuario Incorrecto",
                  text : "Rostro no encontrado. Ingrese nuevamente",
                  type : "error",
                  timer: 4000
                });
                setTimeout(() => {},6000);
                window.location.reload();
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

  putAttendance() {
    var attendance = this.attendanceService.getAttendance();
    this.attendanceService.putAttendance(attendance).subscribe(
      res => {
        var string = JSON.stringify(res);
        var json = JSON.parse(string);
        if(json.ConsumedCapacity.CapacityUnits>=1){
          this.router.navigate(['/user']);
        }else{
          this.userAuthService.logout();
          window.location.reload();
        }
        
      },
      err => {
        console.error(err);
      }
    );

  }

}
