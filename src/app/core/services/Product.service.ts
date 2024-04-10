import { Injectable } from '@angular/core';
import { ProductDTO } from '../interfaces/ProductDTO';
import { HttpClientService } from './HttpClient';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private http: HttpClientService
    ) { }

    get() {
        return this.http.Get('productos');
    }

    getById(productId: number) {
        return this.http.Get(`productos/${productId}`);
    }

    save(payload: any) {
        return this.http.Post('productos', payload);
    }

    delete(productId: Number) {
        return this.http.Delete(`productos/${productId}`)
    }

}