import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticsService } from 'src/app/core/services/Statistics.service';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { TablePaginationComponent } from '../../../shared/components/table-pagination/table-pagination.component';
import { EmployeeDTO } from 'src/app/core/interfaces/EmployeeDTO';
import { fields } from '../../../core/helpers/validateFields';
import { EmployesTransformer} from 'src/app/core/transformers/EmployeeTransformer'

interface Header {
  name: string;
  column: string;
  show: boolean;
}

interface FormEmployee {
  fechaDesde: '';
  fechaHasta: '';
  idEmpleado: number;
}

@Component({
  selector: 'app-tab-employees',
  templateUrl: './tab-employees.component.html',
  styleUrls: ['./tab-employees.component.css']
})
export class TabEmployeesComponent implements OnInit {

  @ViewChild(TablePaginationComponent) ChildTablePaginationComponent: any;

  formEmployee: FormEmployee = {
    fechaDesde: '',
    fechaHasta: '',
    idEmpleado: 0
  }
  employees: EmployeeDTO[] = [];
  validates: [] = [];
  employeeId: number = 0
  listEmployeeDetail = [];
  totalProducts = [];
  totalPayment = [];
  totalService = [];

  headers: Header[] = [
    { name: 'FECHA', column: 'fecha', show: true },
    { name: "ELEMENTO", column: 'elemento', show: true },
    { name: "%", column: 'porcentaje', show: true },
    { name: "VALOR VENTA", column: 'valorVenta', show: true },
    { name: "VALOR COMISIÓN", column: 'valorAPagar', show: true },
  ]

  constructor(
    private statisticService: StatisticsService,
    private employeeService: EmployeeService
  ) { }


  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.employeeService.get().subscribe(
      (response: any) => {
        this.employees = EmployesTransformer(response);
        console.log(this.employees)
      }
    );
  }
  selectedEmployee() {
    this.formEmployee = {
      ...this.formEmployee,
      idEmpleado: Number(this.employeeId)
    }

  }
  getEmployeeDetail() {
    const response: any = fields(this.formEmployee);
    this.validates = (!response) ? [] : response;

    if (this.formEmployee.fechaDesde.length > 0 && this.formEmployee.fechaHasta.length > 0 && this.formEmployee.idEmpleado > 0) {
      this.statisticService.employeeDetail(this.formEmployee).subscribe((resp: any) => {
        this.listEmployeeDetail = resp.listaEmpleadoDetalle;
        this.totalProducts = resp.totalProductos;
        this.totalPayment = resp.totalAPagar;
        this.totalService = resp.totalServicios;
        if (this.listEmployeeDetail.length > 0) {
          this.ChildTablePaginationComponent.getTable(this.listEmployeeDetail);
        }
      })
    }

  }

  getMessageValidate(field: string) {
    const response: any = this.validates.find((e: any) => e.field == field);
    return response ? response.message : null;
  }
}
