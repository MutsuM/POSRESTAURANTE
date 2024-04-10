import { Injectable } from '@angular/core';
import { HttpClientService } from './HttpClient';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(
        private http: HttpClientService
    ) { }

    get() {
        return this.http.Get('clientes');
    }

    getById(clientId: number) {
        return this.http.Get(`clientes/${clientId}`);
    }

    save(payload: any) {
        return this.http.Post('clientes', payload);
    }

    delete(clienttId: Number) {
        return this.http.Delete(`clientes/${clienttId}`)
    }
}