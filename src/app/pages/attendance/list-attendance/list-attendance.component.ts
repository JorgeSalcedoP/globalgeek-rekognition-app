import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ExcelService } from 'src/app/services/excel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrls: ['./list-attendance.component.scss'],
  providers: [DatePipe]
})
export class ListAttendanceComponent implements OnInit {

  users: any = [];
  attendances: any = [];
  attendancesSelected: any = [];

  reporte = {
    since_date: '',
    to_date: '',
    documentUser: ''
  }

  constructor(
    private userService: UserService,
    private attendanceService: AttendanceService,
    private datePipe: DatePipe,
    private excelService: ExcelService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getAttendances();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  getAttendances() {
    this.attendanceService.getAttendances().subscribe(
      res => {
        this.attendances = res;
        this.attendancesSelected = res;
      },
      err => {
        console.error(err)
      }
    );
  }

  sinceChange() {
    if (this.reporte.to_date === '' && this.reporte.documentUser === '') {
      let filter = this.attendancesSelected.filter(item => item.dateAttendance >= this.datePipe.transform(this.reporte.since_date, 'dd/MM/yy'));
      this.attendances = filter;
    } else if (this.reporte.to_date === '' && this.reporte.documentUser != '') {
      let filter = this.attendancesSelected.filter(item => item.dateAttendance >= this.datePipe.transform(this.reporte.since_date, 'dd/MM/yy') && item.documentUser === this.reporte.documentUser);
      this.attendances = filter;
    } else if (this.reporte.to_date != '' && this.reporte.documentUser === '') {
      let filter = this.attendancesSelected.filter(item => item.dateAttendance >= this.datePipe.transform(this.reporte.since_date, 'dd/MM/yy') && item.dateAttendance <= this.datePipe.transform(this.reporte.to_date, 'dd/MM/yy'));
      this.attendances = filter;
    } else if (this.reporte.to_date != '' && this.reporte.documentUser != '') {
      let filter = this.attendancesSelected.filter(item => item.dateAttendance >= this.datePipe.transform(this.reporte.since_date, 'dd/MM/yy') && item.dateAttendance <= this.datePipe.transform(this.reporte.to_date, 'dd/MM/yy') && item.documentUser === this.reporte.documentUser);
      this.attendances = filter;
    }

  }

  toChange() {
    if (this.reporte.since_date === '' && this.reporte.documentUser === '') {
      let filter = this.attendancesSelected.filter(item => item.dateAttendance <= this.datePipe.transform(this.reporte.to_date, 'dd/MM/yy'));
      this.attendances = filter;
    } else if (this.reporte.since_date === '' && this.reporte.documentUser != '') {
      let filter = this.attendancesSelected.filter(item => item.dateAttendance <= this.datePipe.transform(this.reporte.to_date, 'dd/MM/yy') && item.documentUser === this.reporte.documentUser);
      this.attendances = filter;
    } else if (this.reporte.since_date != '' && this.reporte.documentUser === '') {
      let filter = this.attendancesSelected.filter(item => item.dateAttendance >= this.datePipe.transform(this.reporte.since_date, 'dd/MM/yy') && item.dateAttendance <= this.datePipe.transform(this.reporte.to_date, 'dd/MM/yy'));
      this.attendances = filter;
    } else if (this.reporte.since_date != '' && this.reporte.documentUser != '') {
      let filter = this.attendancesSelected.filter(item => item.dateAttendance >= this.datePipe.transform(this.reporte.since_date, 'dd/MM/yy') && item.dateAttendance <= this.datePipe.transform(this.reporte.to_date, 'dd/MM/yy') && item.documentUser === this.reporte.documentUser);
      this.attendances = filter;
    }
  }

  employeeChange() {
    if (this.reporte.since_date === '' && this.reporte.to_date === '') {
      let filter = this.attendancesSelected.filter(item => item.documentUser === this.reporte.documentUser);
      this.attendances = filter;
    } else if (this.reporte.since_date === '' && this.reporte.to_date != '') {
      let filter = this.attendancesSelected.filter(item => item.dateAttendance <= this.datePipe.transform(this.reporte.to_date, 'dd/MM/yy') && item.documentUser === this.reporte.documentUser);
      this.attendances = filter;
    } else if (this.reporte.since_date != '' && this.reporte.to_date === '') {
      let filter = this.attendancesSelected.filter(item => item.dateAttendance >= this.datePipe.transform(this.reporte.since_date, 'dd/MM/yy') && item.documentUser === this.reporte.documentUser);
      this.attendances = filter;
    } else if (this.reporte.since_date != '' && this.reporte.to_date != '') {
      let filter = this.attendancesSelected.filter(item => item.dateAttendance >= this.datePipe.transform(this.reporte.since_date, 'dd/MM/yy') && item.dateAttendance <= this.datePipe.transform(this.reporte.to_date, 'dd/MM/yy') && item.documentUser === this.reporte.documentUser);
      this.attendances = filter;
    }
  }

  cleanFilter() {
    this.reporte.since_date = '',
      this.reporte.to_date = '';
    this.reporte.documentUser = '';
    this.getAttendances();
  }

  exportAsXLSX() {
    Swal.fire({
      title: 'Exportar asistencia?',
      text: "Esta a punto de generar un reporte en formato Excel!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Generar',
    }).then((result) => {
      if (result.value) {
        let table = [];
        this.attendances.forEach(item => {
          let row = [item.documentUser, item.nameAttendance, item.datetime, this.datePipe.transform(item.dateAttendance, 'dd/MM/yy'), item.timeAttendance, item.typeAttendance, item.hoursAttendance, item.stateAttendance];
          table.push(row);
        });
        this.excelService.generateExcel(table);
      }
    });
  }

}
