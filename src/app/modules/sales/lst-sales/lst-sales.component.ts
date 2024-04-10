import { Component, OnInit,ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { TablePaginationComponent } from '../../../shared/components/table-pagination/table-pagination.component';
import { Router } from '@angular/router';
import { PrefixUrl } from '../../../core/constants/index';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from 'src/app/core/services/Sales.service';
import { SaleTransformer } from 'src/app/core/transformers/SalesTransformer';
import { SalesDTO } from 'src/app/core/interfaces/SalesDTO';

interface Header {
  name: string;
  column: string;
  show: boolean;
}
@Component({
  selector: 'app-lst-sales',
  templateUrl: './lst-sales.component.html',
  styleUrls: ['./lst-sales.component.css']
})
export class LstSalesComponent implements OnInit {

  @ViewChild(TablePaginationComponent) ChilTablePaginationComponent: any;

  sales: SalesDTO[] = [];
  searchText: any;
  //p: number = 1;

  headers: Header[] = [
    { name: 'ID', column: 'saleId', show: false },
    { name: 'CLIENTE', column: 'clientName', show: true },
    { name: "FECHA", column: 'date', show: true },
    { name: "TOTAL", column: 'total', show: true },
    { name: "DESCUENTO", column: 'discount', show: true },
    { name: "IMPUESTO", column: 'tax', show: true },
    { name: "EMPLEADO", column: 'employeeName', show: true },
    { name: "FORMA DE PAGO", column: 'salePaymentName', show: true },
    { name: "NOTAS", column: 'notes', show: true },
  ]

  constructor(
    private salesServices: SalesService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.salesServices.listSales().subscribe(
      (response: any) => {
        this.sales = SaleTransformer(response);
        this.ChilTablePaginationComponent.getTable(this.sales);
      }
    );
  }

  redirectUpdate(element: any) {
    this.router.navigate([`/${PrefixUrl}/sales/update/${element.saleId}`]);
  }

  deleteSales(element: any) {
    Swal.fire({
      title: `¿Desea eliminar la venta ${element.name}?`,
      text: 'Una vez eliminado no podrá recuperar este proveedor',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.salesServices.delete(3).subscribe(
          (response) => {
            if (response) {
              this.getSales();
              this.toastr.success(`sale ${element.name} deleted successfully`);
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
