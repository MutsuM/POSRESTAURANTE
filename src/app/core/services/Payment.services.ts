import { Injectable } from '@angular/core';
import { PaymentDTO } from '../interfaces/PaymentDTO';
import { HttpClientService } from './HttpClient';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(
        private http: HttpClientService
    ) { }

    get() {
        return this.http.Get('formapagoproveedor');
    }

    
}