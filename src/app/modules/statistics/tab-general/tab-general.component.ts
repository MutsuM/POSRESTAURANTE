import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChartsComponent } from '../../../shared/components/apex-charts/apex-charts.component';
import { StatisticsService } from 'src/app/core/services/Statistics.service';
import { fields } from '../../../core/helpers/validateFields';
import { StatisticsDTO } from 'src/app/core/interfaces/StatisticsDTO';

@Component({
  selector: 'app-tab-general',
  templateUrl: './tab-general.component.html',
  styleUrls: ['./tab-general.component.css']
})
export class TabGeneralComponent implements OnInit {
  
  date : any = {
    año:null,
    cantidad:null,
    descripcion:null,
    fechaDesde:'',
    fechaHasta:'',
    idEmpleado:null,
    mes:null,
    nombresEmpleado:null,
    precioCosto:null,
    total:null
  };

  datos: any = []
  sumary:any = [];
  series:any = [];
  validates: [] = [];
  
  @ViewChild(ApexChartsComponent) ChildApexChartsComponent: any;

  constructor(
    private statistics : StatisticsService
  ){}

  ngOnInit(): void {
   }

  getSummarySale(){
    this.statistics.listSummarySalesGeneral(this.date).subscribe((response)=>{
      this.sumary = response;
    })
  }
 
   getStatistics() {
    const response: any = fields(this.date);
    const categories:any = [];
    const data:any  = [];
    this.validates = (!response) ? [] : response;

    if(this.date.fechaDesde.length > 0  && this.date.fechaHasta.length > 0){
    this.getSummarySale();
    this.statistics.listGeneralSales(this.date).subscribe((resp) => {
      this.datos = resp;
      for (let i = 0; i < this.datos.length; i++) {
        categories.push(this.datos[i].mes)
        data.push(this.datos[i].total)
        this.series = [{ name: "TOTAL", data: data }]

        this.ChildApexChartsComponent.getCharts(this.series,categories)
      
      }})

    }
 
  }

  getMessageValidate(field: string) {
    const response: any = this.validates.find((e: any) => e.field == field);
    return response ? response.message : null;
  }
}
