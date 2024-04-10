import { Injectable } from '@angular/core';
import { HttpClientService } from './HttpClient';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(
        private http: HttpClientService
    ) { }

    get() {
        return this.http.Get('empleados');
    }

}