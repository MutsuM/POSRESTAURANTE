import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChartsComponent } from '../../../shared/components/apex-charts/apex-charts.component';
import { StatisticsService } from 'src/app/core/services/Statistics.service';
import { fields } from '../../../core/helpers/validateFields';

@Component({
  selector: 'app-tab-employee-detail',
  templateUrl: './tab-employee-detail.component.html',
  styleUrls: ['./tab-employee-detail.component.css']
})

export class TabEmployeeDetailComponent implements OnInit {

  date: any = {
    año: null,
    cantidad: null,
    descripcion: null,
    fechaDesde: '',
    fechaHasta: '',
    idEmpleado: null,
    mes: null,
    nombresEmpleado: null,
    precioCosto: null,
    total: null
  };
  datos: any = []
  series: any = [];
  validates: [] = [];

  @ViewChild(ApexChartsComponent) ChildApexChartsComponent: any;

  constructor(
    private statistics: StatisticsService
  ) { }

  ngOnInit(): void { }

  getStatistics() {

    const response: any = fields(this.date);
    this.validates = (!response) ? [] : response;
    
    if(this.date.fechaDesde.length > 0  && this.date.fechaHasta.length > 0){
    this.statistics.employeeSaleList(this.date).subscribe((resp) => {
      this.datos = resp;
      const series: any = [];
      const months: any = [];
      const employees: any = [];

      for (let i = 0; i < this.datos.length; i++) {
        if (!months.find((e: any) => e === this.datos[i].mes)) {
          months.push(this.datos[i].mes);
        }

        if (!employees.find((e: any) => e === this.datos[i].nombresEmpleado)) {
          employees.push(this.datos[i].nombresEmpleado);
        }
      }
      for (let i = 0; i < months.length; i++) {
        const result = this.datos.filter((e: any) => e.mes === months[i]);
        for (let j = 0; j < employees.length; j++) {
          const resultEmployee = result.find((e: any) => e.nombresEmpleado === employees[j]);
          if (!series.find((e: any) => e.name === employees[j])) {
            series.push({
              name: employees[j],
              data: [resultEmployee ? resultEmployee.total : 0]
            });
          } else {
            const position = series.findIndex((e: any) => e.name === employees[j]);
            series[position].data.push(resultEmployee ? resultEmployee.total : 0);
          }
        }
      }
      
      this.series = series;
      this.ChildApexChartsComponent.getCharts(series, months);
    });
  }}

  redirectDetail({ dataPointIndex, seriesIndex }: any) {
    console.log('ENTRANDO A NUEVA RUTA', { dataPointIndex, seriesIndex });
  }

  getMessageValidate(field: string) {
    const response: any = this.validates.find((e: any) => e.field == field);
    return response ? response.message : null;
  }
}
