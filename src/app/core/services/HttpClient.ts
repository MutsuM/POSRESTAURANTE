import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URI } from '../constants/index';

interface Credential {
    sub: string;
    username: string;
    authorization: string;
    refreshToken: string;
}

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {

    private credentiales: Credential = {
        sub : '',
        username : '',
        authorization : '',
        refreshToken : ''
    };

    constructor(
        private http: HttpClient
    ) { }

    Post(URL: string, payload: {}, headers?: {}) {
        return this.http.post(`${URI}/${URL}`,  payload, {
            headers: {
                ...headers,
                Authorization: this.credentiales.authorization ? `Bearer ${this.credentiales.authorization}` : ''
            }
        });
    }

    Get(URL: string, headers?: {}) {
        return this.http.get(`${URI}/${URL}`, {
            headers: {
                ...headers,
                Authorization: this.credentiales.authorization ? `Bearer ${this.credentiales.authorization}` : ''
            }
        });
    }

    Delete(URL: string, headers?: {}) {
        return this.http.delete(`${URI}/${URL}`, {
            headers: {
                ...headers,
                Authorization: this.credentiales.authorization ? `Bearer ${this.credentiales.authorization}` : ''
            }
        });
    }

}