import { Injectable } from '@angular/core';
import { SalePaymentDTO } from '../interfaces/SalePaymentDTO';
import { HttpClientService } from './HttpClient';

@Injectable({
    providedIn: 'root'
})
export class PaymentSalesService {

    constructor(
        private http: HttpClientService
    ) { }

    get() {
        return this.http.Get('formapagoventa');
    }

    
}