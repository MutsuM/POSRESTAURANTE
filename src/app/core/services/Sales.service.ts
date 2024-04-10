import { Injectable } from '@angular/core';
import {ProviderDTO} from '../interfaces/ProviderDTO'
import { HttpClientService } from './HttpClient';

@Injectable({
    providedIn: 'root'
})
export class SalesService {

    constructor(
        private http: HttpClientService
    ) { }

    listSales() {
        return this.http.Get('ventas')
    }

    getById(saleId: number) {
        return this.http.Get(`ventas/${saleId}`);
    }

    save(payload: any) {
        return this.http.Post('ventas', payload);
    }

    delete(providerId: Number) {
        return this.http.Delete(`ventas/${providerId}`)
    }

    detailSale(saleId:number){
        return this.http.Get(`ventas/detalleVentas/${saleId}`)
    }
}