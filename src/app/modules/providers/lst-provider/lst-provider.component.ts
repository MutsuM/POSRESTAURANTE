import { Component, OnInit, ViewChild } from '@angular/core';
import { ProviderDTO } from '../../../core/interfaces/ProviderDTO';
import { Router } from '@angular/router';
import { PrefixUrl } from '../../../core/constants/index';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from '../../../core/services/Provider.service';
import { ProvidersTransformer } from '../../../core/transformers/ProviderTransformer';
import Swal from 'sweetalert2';
import { TablePaginationComponent } from '../../../shared/components/table-pagination/table-pagination.component';


interface Header {
  name: string;
  column: string;
  show: boolean;
}
@Component({
  selector: 'app-lst-provider',
  templateUrl: './lst-provider.component.html',
  styleUrls: ['./lst-provider.component.css']
})
export class LstProviderComponent implements OnInit {

  @ViewChild(TablePaginationComponent) ChilTablePaginationComponent: any;

  providers: ProviderDTO[] = [];
  searchText: any;
  p: number = 1;
  headers: Header[] = [
    { name: 'ID', column: 'providerId', show: false },
    { name: 'NOMBRE', column: 'name', show: true },
    { name: "EMAIL", column: 'email', show: true },
    { name: "NOTAS", column: 'notes', show: true },
    { name: "PERSONA CONTACTO", column: 'contactPerson', show: true },
    { name: "TELÉFONO", column: 'telephone', show: true },
    { name: "FORMA DE PAGO", column: 'weyToPayType', show: true },
  ]

  constructor(
    private providerService: ProviderService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders() {
    this.providerService.get().subscribe(
      (response: any) => {
        this.providers = ProvidersTransformer(response);
        this.ChilTablePaginationComponent.getTable(this.providers);
      }
    );
  }

  redirectUpdate(element: any) {
    this.router.navigate([`/${PrefixUrl}/providers/update/${element.providerId}`]);
  }

  deleteProvider(element: any) {
    Swal.fire({
      title: `¿Desea eliminar el proveedor ${element.name}?`,
      text: 'Una vez eliminado no podrá recuperar este proveedor',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.providerService.delete(element.providerId).subscribe(
          (response) => {
            if (response) {
              this.getProviders();
              this.toastr.success(`Provider ${element.name} deleted successfully`);
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
