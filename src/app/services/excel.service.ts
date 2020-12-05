import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  generateExcel(report) {
    const title = 'Reporte de Asistencia';
    //Excel Title, Header, Data
    const header = ['DOCUMENTO', 'EMPLEADO', 'FECHA Y HORA', 'FECHA', 'HORA', 'MARCACIÓN', 'HORAS TRABAJADAS - (H:mm)', 'ESTADO LABORAL'];
    const data = report;
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('REPORTE ASISTENCIA');

    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Arial', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.mergeCells(`A${titleRow.number}:H${titleRow.number}`);
    titleRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'DDEBF7' }
    };
    //Add Header Row
    let headerRow = worksheet.addRow(header);

    worksheet.autoFilter = 'A2:H2';


    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4EC087' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });

    data.forEach(d => {
      let row = worksheet.addRow(d);
      row.getCell(4).value = new Date(d[3]);

    });

    worksheet.getColumn(1).width = 10;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 10;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 25;
    worksheet.getColumn(8).width = 20;

    var name = 'GLOBALGEEK_' + new Date().getTime() + '.xlsx';

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, name);
    })
  }
}
