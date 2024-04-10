import { Component, OnInit, ViewChild  } from '@angular/core';
import { ProductService } from '../../../core/services/Product.service';
import { ProductsTransformer } from '../../../core/transformers/ProductTransformer';
import { PaymentSalesTransformer } from '../../../core/transformers/PaymentSalesTransformer';
import { ProductDTO } from '../../../core/interfaces/ProductDTO';
import { ServiceDTO } from '../../../core/interfaces/ServiceDTO';
import { EmployeeDTO } from 'src/app/core/interfaces/EmployeeDTO';
import { ServiceService } from '../../../core/services/Service.service';
import { EmployeeService } from '../../../core/services/Employee.service'
import { ServicesTransformer } from '../../../core/transformers/ServiceTransformer';
import { EmployesTransformer } from 'src/app/core/transformers/EmployeeTransformer';
import { ClientsTransformer } from 'src/app/core/transformers/ClientTransformer';
import { TablePaginationComponent } from '../../../shared/components/table-pagination/table-pagination.component';
import { Router } from '@angular/router';
import { PrefixUrl } from '../../../core/constants/index';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { fields } from '../../../core/helpers/validateFields';
import { ClientService } from 'src/app/core/services/Client.service';
import { ClientDTO } from 'src/app/core/interfaces/ClientDTO';
import { SalesDTO } from 'src/app/core/interfaces/SalesDTO';
import { DetailSalesDTO } from 'src/app/core/interfaces/DetailSalesDTO';
import { SalePaymentDTO } from 'src/app/core/interfaces/SalePaymentDTO';
import { SaleTransformer,SalesTransformer } from 'src/app/core/transformers/SalesTransformer';
import { SalesService } from 'src/app/core/services/Sales.service';

interface Header {
  name: string;
  column: string;
  show: boolean;
}



@Component({
  selector: 'app-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrls: ['./new-sales.component.css']
})
export class NewSalesComponent implements OnInit {

  @ViewChild(TablePaginationComponent) ChilTablePaginationComponent: any;
 
  products : ProductDTO[] = [];
  services: ServiceDTO[] = [];
  paymentSales : SalePaymentDTO[] = [];
  employee: EmployeeDTO[] = [];
  validates: [] = [];

  sales:SalesDTO={
   
    discountSale:0,
    tax:0,
    notes:'',
    total:0,
    subtotal:0,
    detailSales:[],
    
  };

  clients: ClientDTO[] = [];
  clientId:number = 0;
  employeeId:number = 0;
  idTableServices:string = 'idTableServices';
  idTableProducts:string = 'idTableProducts'
  searchTextProduct: any;
  searchText: any;
  detailSale:any[] =[];
  tax:any = 1;
  subTotal:number = 0;
  total:number = 0;
  tabIndex: number = 0;
  msgClient:string = '';
  msgEmployee:string = '';
  msgNote:string = '';
  activeButon:boolean = true;

  headersProducts: Header[] = [
    { name: 'ID',column: 'productId', show: false },
    { name: "REFERENCIA", column: 'reference', show: false },
    { name: "DESCRIPCIÓN", column: 'description', show: true },
    { name: "PRECIO VENTA", column: 'salePrice', show: true }
  ]

  headersServices: Header[] = [
    { name: 'ID', column: 'serviceId', show: false },
    { name: "REFERENCIA", column: 'reference', show: false },
    { name: "DESCRIPCIÓN", column: 'description', show: true },
    { name: "PRECIO", column: 'price', show: true }
  ]

  constructor(
    
    private productService: ProductService,
    private serviceService: ServiceService,
    private employeeService: EmployeeService,
    private clientService:ClientService,
    private salesService : SalesService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getEmployee();
    this.getClients();
  }
 
  
  getProducts() {
    this.productService.get().subscribe(
      (response: any) => {
        this.products = ProductsTransformer(response);
        this.ChilTablePaginationComponent.getTable(this.products);
      }
    );
  }

  getServices() {
    this.serviceService.get().subscribe(
      (response: any) => {
        this.services = ServicesTransformer(response);
        this.ChilTablePaginationComponent.getTable(this.services);
      }
    );
  }

  getEmployee() {
    this.employeeService.get().subscribe(
      (response: any) => {
        this.employee = EmployesTransformer(response);
      }
    );
  }

  getClients() {
    this.clientService.get().subscribe(
      (response: any) => {
        this.clients = ClientsTransformer(response);
        
      }
    );
  }

  getTableTabs(event: any) {
    if (event.index === 0) this.getProducts();
    if (event.index === 1) this.getServices();
    
    this.tabIndex = event.index;
  }
 
  deleteDetail(i:any){
    this.sales.discountSale -= parseInt(this.detailSale[i].discount) 
    this.detailSale.splice(i,1)
   
    if(this.detailSale.length > 0) {
      const totals  = this.detailSale.map(e=>e.total)   
      const sum = totals.reduce((accumulator, current) => accumulator + current); 
      this.sales.subtotal = parseFloat((sum).toFixed(2))
      this.sales.tax = parseFloat((sum - (sum/1.18)).toFixed(2))
      this.sales.total = parseFloat((this.sales.subtotal + this.sales.tax).toFixed(2))
    }else{
      this.sales.subtotal = 0
      this.sales.tax = 0
      this.sales.total = 0
    }
    if(this.detailSale.length > 0){
      this.activeButon = false
    }else{
      this.activeButon = true
    }
  }

  save(e:any){
    this.sales = {
      ...this.sales,
      salePayment:{
        formPaymentSaleId:Number(e)
      }
    }
    const response: any = fields(this.sales);
    this.msgClient = this.clientId == 0 ? 'Field is required' : '';
    this.msgEmployee = this.employeeId == 0 ? 'Field is required' : '';
    this.msgNote = this.employeeId == 0 ? 'Field is required' : '';
    this.sales.detailSales = (this.detailSale)
    const sale = SalesTransformer(this.sales)
    this.validates = (!response) ? [] : response;
    if (!response && this.msgEmployee === '' && this.msgClient === '' && this.msgNote === '') {
      this.salesService.save(SalesTransformer(this.sales)).subscribe(
        (response: any) => {
          this.toastr.success('sale created successfully');
          this.cleanForm();
        }
      );
    }
  }

  searchProduct(){
    this.ChilTablePaginationComponent.getChangeTable();
  }

  search(){
    this.ChilTablePaginationComponent.getChangeTable();
  }

  changeAmount(e:any,i:any){
    this.detailSale[i].amount = parseInt(e.target.value)
    this.detailSale[i].subtotal = e.target.value * this.detailSale[i].price
    this.detailSale[i].total = this.detailSale[i].subtotal - (this.detailSale[i].subtotal * this.detailSale[i].discount/100 )
    const totals  = this.detailSale.map(e=>e.total)  
    const sum = totals.reduce((accumulator, current) => accumulator + current);          
    this.sales.subtotal = parseFloat((sum).toFixed(2))
    this.sales.tax = parseFloat((sum - (sum/1.18)).toFixed(2))
    this.sales.total = parseFloat((this.sales.subtotal + this.sales.tax).toFixed(2))
  }

  changeDiscount(e:any,i:any){
    this.detailSale[i].discount = parseInt(e.target.value)
    this.detailSale[i].total = this.detailSale[i].subtotal - (this.detailSale[i].subtotal * this.detailSale[i].discount/100 )
    this.sales.tax += (this.detailSale[i].total - (this.detailSale[i].total /1.18)) 
    const totalsDiscount  = this.detailSale.map(e=>e.discount)  
    const sumDiscount = totalsDiscount.reduce((accumulator, current) => accumulator + current);   
    this.sales.discountSale = parseFloat((sumDiscount).toFixed(2)) 
    const totals  = this.detailSale.map(e=>e.total)  
    const sum = totals.reduce((accumulator, current) => accumulator + current);          
    this.sales.subtotal = parseFloat((sum).toFixed(2))
    this.sales.tax = parseFloat((sum - (sum/1.18)).toFixed(2))
    this.sales.total = parseFloat((this.sales.subtotal + this.sales.tax).toFixed(2))
  }

  changePrice(e:any,i:any){
    this.detailSale[i].price = parseInt(e.target.value)
    this.detailSale[i].subtotal = this.detailSale[i].price * this.detailSale[i].amount
    this.detailSale[i].total = this.detailSale[i].subtotal - (this.detailSale[i].subtotal * this.detailSale[i].discount/100 )
    const totals  = this.detailSale.map(e=>e.total)  
    const sum = totals.reduce((accumulator, current) => accumulator + current);          
    this.sales.subtotal = parseFloat((sum).toFixed(2))
    this.sales.tax = parseFloat((sum - (sum/1.18)).toFixed(2))
    this.sales.total = parseFloat((this.sales.subtotal + this.sales.tax).toFixed(2))
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

  selectProduct(element: any){
    const detalle:DetailSalesDTO = {reference:element.description,
                         idItem:element.productId ? element.productId :element.serviceId,
                        tipoItem:element.productId ? 2 : 1,
                        price:element.salePrice ? element.salePrice :element.price,
                         amount:1,
                         subtotal:element.productId ? element.salePrice * 1 : element.price * 1,
                         total:element.productId ? element.salePrice * 1 : element.price * 1,
                         discount:0
                        }
    this.detailSale.push(detalle) 
    const totals  = this.detailSale.map(e=>e.total)  
    const sum = totals.reduce((accumulator, current) => accumulator + current);          
    if(this.detailSale.length > 0){
      this.activeButon = false
    }
    this.sales.tax = parseFloat((sum - (sum/1.18)).toFixed(2))
    this.sales.subtotal = parseFloat((sum).toFixed(2))
    this.sales.total = parseFloat((this.sales.subtotal + this.sales.tax).toFixed(2))
  }

  selectedClient(){
    this.sales = {
      ...this.sales,
      client:{
        clientId:Number(this.clientId)
      }
    }
  }
  selectedEmployee(){
    this.sales = {
      ...this.sales,
      employee:{
        employeeId:Number(this.employeeId)
      }
    }
  }

  selectedEmployeeDetail(i:any,e:any){
    this.detailSale[i].employee = parseInt(e.target.value)
  }

  cleanForm() {
    this.sales = {
      discountSale: 0,
      notes: '',
      subtotal: 0,
      date:null,
      tax:0,
      total: 0,
      client:{clientId:0},
      detailSales: [],
      employee:{employeeId:0}, 
    };
    this.employeeId = 0,
    this.clientId = 0
    this.detailSale = []
  }
}