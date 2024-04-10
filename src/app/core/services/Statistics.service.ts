import { Injectable } from '@angular/core';
import { HttpClientService } from './HttpClient';
import { StatisticsDTO } from '../interfaces/StatisticsDTO';

@Injectable({
    providedIn: 'root'
})

export class StatisticsService {

    constructor(
        private http: HttpClientService
    ) { }

    listGeneralSales(payload:StatisticsDTO) {
        return this.http.Post('estadisticas/generales',payload);
    }

    listSummarySalesGeneral(payload:StatisticsDTO) {
        return this.http.Post('estadisticas/resumengenerales',payload);
    }
    
    employeeSaleList(payload:StatisticsDTO){
        return this.http.Post('estadisticas/empleados',payload);
    }

    employeeDetail(payload:any){
        return this.http.Post('estadisticas/empleados/detalle',payload)
    }
}