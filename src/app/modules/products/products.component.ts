import { Component, OnInit } from '@angular/core';
import { URL } from '../../core/helpers/url';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private url: URL
  ) { }

  ngOnInit(): void {
  }

}
