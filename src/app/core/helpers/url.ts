import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class URL {

    constructor(
        private router: Router
    ) { }

    getUrl() {
        return this.router.url;
    }

    latestUrl() {
        const url = this.router.url;
        const split = url.split('/');
        return split[split.length - 1]
    }

}