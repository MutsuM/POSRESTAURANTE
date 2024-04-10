import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrefixUrl } from '../../../core/constants/index';
import { ClientDTO } from '../../../core/interfaces/ClientDTO';
import { ClientService } from '../../../core/services/Client.service';
import { TablePaginationComponent } from '../../../shared/components/table-pagination/table-pagination.component';
import { ClientTransformer ,ClientsTransformer} from '../../../core/transformers/ClientTransformer';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

interface Header {
  name: string;
  column: string;
  show: boolean;
}

@Component({
  selector: 'app-lst-client',
  templateUrl: './lst-client.component.html',
  styleUrls: ['./lst-client.component.css']
})
export class LstClientComponent implements OnInit {

  @ViewChild(TablePaginationComponent) ChilTablePaginationComponent: any;

  clients: ClientDTO[] = [];
  searchText: any;
  p: number = 1;

  headers: Header[] = [
    { name: 'ID',column: 'clientId', show: false },
    { name: "NOMBRES", column: 'names', show: true },
    { name: "APELLIDO PATERNO", column: 'lastNameFat', show: true },
    { name: "APELLIDO MATERNO", column: 'lastNameMot', show: true },
    { name: "CORREO", column: 'email', show: true },
    { name: "TELÉFONO", column: 'telephone', show: true },
    { name: "ESTADO", column: 'active', show: true }
  ]

  constructor(
    private clientService: ClientService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientService.get().subscribe(
      (response: any) => {
        this.clients = ClientsTransformer(response);
        this.ChilTablePaginationComponent.getTable(this.clients);
      }
    );
  }

  redirectUpdate(element: any) {
    this.router.navigate([`/${PrefixUrl}/clients/update/${element.clientId}`]);
  }

  deleteClient(element: any) {
    Swal.fire({
      title: `¿Desea eliminar el cliente ${element.names}?`,
      text: 'Una vez eliminado no podrá recuperar este cliente',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.delete(element.clientId).subscribe(
          (response) => {
            if (response) {
              this.getClients();
              this.toastr.success(`Provider ${element.names} deleted successfully`);
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
