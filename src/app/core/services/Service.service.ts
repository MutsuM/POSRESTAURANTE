import { Injectable } from '@angular/core';
import { HttpClientService } from './HttpClient';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    constructor(
        private http: HttpClientService
    ) { }

    get() {
        return this.http.Get('servicios');
    }

    getById(serviceId: number) {
        return this.http.Get('servicios/' + serviceId);
    }

    save(payload: any) {
        return this.http.Post('servicios', payload);
    }

    delete(serviceId: number) {
        return this.http.Delete(`servicios/${serviceId}`)
    }

}