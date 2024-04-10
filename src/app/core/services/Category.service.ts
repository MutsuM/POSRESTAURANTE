import { Injectable } from '@angular/core';
import { HttpClientService } from './HttpClient';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private http: HttpClientService
    ) { }

    get() {
        return this.http.Get('categorias');
    }

    save(payload: any) {
        return this.http.Post('categorias', payload);
    }

    delete(categoryId: number) {
        return this.http.Delete(`categorias/${categoryId}`);
    }

    getById(categoryId: number) {
        return this.http.Get(`categorias/${categoryId}`);
    }

}