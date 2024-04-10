import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrefixUrl } from '../../../core/constants/index';
import { ToastrService } from 'ngx-toastr';
import { ServiceDTO } from '../../../core/interfaces/ServiceDTO';
import { ServiceService } from '../../../core/services/Service.service';
import { ServicesTransformer } from '../../../core/transformers/ServiceTransformer';
import Swal from 'sweetalert2';
import { TablePaginationComponent } from '../../../shared/components/table-pagination/table-pagination.component';

interface Header {
  name: string;
  column: string;
  show: boolean;
}

@Component({
  selector: 'app-lst-service',
  templateUrl: './lst-service.component.html',
  styleUrls: ['./lst-service.component.css']
})
export class LstServiceComponent implements OnInit {

  @ViewChild(TablePaginationComponent) ChilTablePaginationComponent: any;

  searchText: any
  services: ServiceDTO[] = [];
  headers: Header[] = [
    { name: 'ID', column: 'serviceId', show: false },
    { name: "REFERENCIA", column: 'reference', show: true },
    { name: "DESCRIPCIÓN", column: 'description', show: true },
    { name: "PRECIO", column: 'price', show: true },
    { name: "DURACIÓN", column: 'duration', show: true },
    { name: "CATEGORIA", column: 'categoryDescription', show: true }
  ]
  constructor(
    private serviceService: ServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.serviceService.get().subscribe(
      (response: any) => {
        this.services = ServicesTransformer(response);
        this.ChilTablePaginationComponent.getTable(this.services);
      }
    );
  }

  redirectUpdate(element: any) {
    this.router.navigate([`/${PrefixUrl}/services/update/${element.serviceId}`]);
  }

  delete(element: any) {
    Swal.fire({
      title: `¿Desea eliminar el servicio ${element.reference}?`,
      text: 'Una vez eliminado no podrá recuperar este servicio',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.delete(element.serviceId).subscribe(
          (response) => {
            if (response) {
              this.getServices();
              this.toastr.success(`Product ${element.reference} deleted successfully`);
            }
          },
          (error) => {
            this.toastr.error(`${error.message}`);
          }
        );
      }
    });
  }

}
