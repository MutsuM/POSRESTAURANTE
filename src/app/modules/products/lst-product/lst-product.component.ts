import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDTO } from '../../../core/interfaces/ProductDTO';
import { Router } from '@angular/router';
import { PrefixUrl } from '../../../core/constants/index';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../core/services/Product.service';
import Swal from 'sweetalert2';
import { TablePaginationComponent } from '../../../shared/components/table-pagination/table-pagination.component';
import { ProductsTransformer } from '../../../core/transformers/ProductTransformer';

interface Header {
  name: string;
  column: string;
  show: boolean;
}

@Component({
  selector: 'app-lst-product',
  templateUrl: './lst-product.component.html',
  styleUrls: ['./lst-product.component.css']
})
export class LstProductComponent implements OnInit {

  @ViewChild(TablePaginationComponent) ChilTablePaginationComponent: any;
  
  searchText:any
  products : ProductDTO[] = [];
  headers: Header[] = [
    { name: 'ID',column: 'productId', show: false },
    { name: "REFERENCIA", column: 'reference', show: true },
    { name: "DESCRIPCIÓN", column: 'description', show: true },
    { name: "PRECIO VENTA", column: 'salePrice', show: true },
    { name: "PRECIO COSTO", column: 'saleCost', show: true },
    { name: "STOCK", column: 'stock', show: true },
    { name: "CATEGORÍA", column: 'categoryDescription', show: true }
  ]

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.get().subscribe(
      (response: any) => {
        this.products = ProductsTransformer(response);
        this.ChilTablePaginationComponent.getTable(this.products);
      }
    );
  }

  redirectUpdate(element: any) {
    this.router.navigate([`/${PrefixUrl}/products/update/${element.productId}`]);
  }

  delete(element: any) {
    Swal.fire({
      title: `¿Desea eliminar el producto ${element.reference}?`,
      text: 'Una vez eliminado no podrá recuperar este producto',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(element.productId).subscribe(
          (response) => {
            if (response) {
              this.getProducts();
              this.toastr.success(`Product ${element.reference} deleted successfully`);
            } else {
              this.toastr.error(`Error ${JSON.stringify(response)}`);
            }
          },
          (error) => {
            this.toastr.error(`${error.message}`);
          }
        );
      }
    });
  }
  search(){
    this.ChilTablePaginationComponent.getChangeTable();
  }
}
