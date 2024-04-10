import { Injectable } from '@angular/core';
import {ProviderDTO} from '../interfaces/ProviderDTO'
import { HttpClientService } from './HttpClient';

@Injectable({
    providedIn: 'root'
})
export class ProviderService {

    constructor(
        private http: HttpClientService
    ) { }

    get() {
        return this.http.Get('proveedores')
    }

    getById(providerId: number) {
        return this.http.Get(`proveedores/${providerId}`);
    }

    save(payload: ProviderDTO) {
        return this.http.Post('proveedores', payload);
    }

    delete(providerId: Number) {
        return this.http.Delete(`proveedores/${providerId}`)
    }

}