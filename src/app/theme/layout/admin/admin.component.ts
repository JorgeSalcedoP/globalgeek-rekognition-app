import { Component, NgZone, OnInit } from '@angular/core';
import { NextConfig } from '../../../app-config';
import { Location } from '@angular/common';
import { Auth } from 'aws-amplify';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public flatConfig: any;
  public navCollapsed: boolean;
  public navCollapsedMob: boolean;
  public windowWidth: number;

  constructor(private zone: NgZone, private location: Location,private authService:AuthService) {
    this.flatConfig = NextConfig.config;
    let currentURL = this.location.path();
    const baseHerf = this.location['_baseHref'];
    if (baseHerf) {
      currentURL = baseHerf + this.location.path();
    }

    this.windowWidth = window.innerWidth;

    if (currentURL === baseHerf + '/layout/collapse-menu'
      || currentURL === baseHerf + '/layout/box'
      || (this.windowWidth >= 992 && this.windowWidth <= 1024)) {
      this.flatConfig.collapseMenu = true;
    }

    this.navCollapsed = (this.windowWidth >= 992) ? this.flatConfig.collapseMenu : false;
    this.navCollapsedMob = false;

  }

  ngOnInit() {
    this.getCommonData();
    if (this.windowWidth < 992) {
      this.flatConfig.layout = 'vertical';
      setTimeout(() => {
        document.querySelector('.pcoded-navbar').classList.add('menupos-static');
        (document.querySelector('#nav-ps-flat-able') as HTMLElement).style.maxHeight = '100%'; // 100% amit
      }, 500);
    }
  }

  navMobClick() {
    if (this.windowWidth < 992) {
      if (this.navCollapsedMob && !(document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open'))) {
        this.navCollapsedMob = !this.navCollapsedMob;
        setTimeout(() => {
          this.navCollapsedMob = !this.navCollapsedMob;
        }, 100);
      } else {
        this.navCollapsedMob = !this.navCollapsedMob;
      }
    }
  }

  getCommonData(){
    this.authService.getCommonData().subscribe(
      data => {
        var json_string = JSON.stringify(data);
        var json = JSON.parse(json_string);
        localStorage.setItem("PositionUser",JSON.stringify(json.positionUser));
        localStorage.setItem("ScheduleUser",JSON.stringify(json.scheduleUser));
      },
      err =>{
        console.error(err);
      }
    );
  }

}
