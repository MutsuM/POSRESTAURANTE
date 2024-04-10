import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { PrefixUrl } from '../../../core/constants/index';
import { URL } from '../../../core/helpers/url';
import { fields } from '../../../core/helpers/validateFields';
import { ToastrService } from 'ngx-toastr';
import { SalesDTO } from 'src/app/core/interfaces/SalesDTO';
import { ClientDTO } from 'src/app/core/interfaces/ClientDTO';
import { EmployeeDTO } from 'src/app/core/interfaces/EmployeeDTO';
import { ProductDTO } from '../../../core/interfaces/ProductDTO';
import { ServiceDTO } from '../../../core/interfaces/ServiceDTO';
import { SalePaymentDTO } from 'src/app/core/interfaces/SalePaymentDTO';
import { SalesService } from 'src/app/core/services/Sales.service';
import { ProductService } from '../../../core/services/Product.service';
import { ServiceService } from '../../../core/services/Service.service';
import { SaleTransformer,SalesTransformer } from 'src/app/core/transformers/SalesTransformer'; 
import { PaymentSalesService } from 'src/app/core/services/PaymentSales.service';
import { PaymentSalesTransformer } from 'src/app/core/transformers/PaymentSalesTransformer';
import { ClientsTransformer, } from 'src/app/core/transformers/ClientTransformer';
import { ClientService } from 'src/app/core/services/Client.service';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { EmployesTransformer, } from 'src/app/core/transformers/EmployeeTransformer';
import { SaleDetailTransformer } from 'src/app/core/transformers/SalesDetailTransformer';
import { TablePaginationComponent } from '../../../shared/components/table-pagination/table-pagination.component';
import { ProductsTransformer } from '../../../core/transformers/ProductTransformer';
import { ServicesTransformer } from '../../../core/transformers/ServiceTransformer';
import { DetailSalesDTO } from 'src/app/core/interfaces/DetailSalesDTO';

interface Header {
  name: string;
  column: string;
  show: boolean;
}

@Component({
  selector: 'app-upd-sales',
  templateUrl: './upd-sales.component.html',
  styleUrls: ['./upd-sales.component.css']
})
export class UpdSalesComponent implements OnInit {

  @ViewChild(TablePaginationComponent) ChilTablePaginationComponent: any;
  Prefix = PrefixUrl;
  products : ProductDTO[] = [];
  services: ServiceDTO[] = [];
  clients: ClientDTO[] = [];
  employee: EmployeeDTO[] = [];
  salePayments: SalePaymentDTO[] = []; 
  searchTextProduct: any;
  searchText: any;
  

  sales:SalesDTO={
    client:{clientId:0},
    discountSale:0,
    tax:0,
    notes:'',
    total:0,
    subtotal:0,
    detailSales:[],
    saleId:0,
  };

  msgSales: string = '';
  msgClients: string = '';
  msgEmployee: string = '';
  msgNote:string = '';
  paymentSaleId:any = 0;
  clientId:any = 0;
  employeeId:number = 0;
  validates: [] = [];
  idTableServices:string = 'idTableServices';
  idTableProducts:string = 'idTableProducts'
  salesId: string = this.url.latestUrl();
  tabIndex: number = 0;
  tax:any = 1;
  subTotal:number = 0;
  total:number = 0;
  discount:number = 0;
  notes:string='';
  saleId:number=0;
  activeButon:boolean = false;
  detailSale:any[]=[]
  msgClient:string = '';
  tipoItem:number=0

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
    private url: URL,
    private toastr: ToastrService,
    private productService: ProductService,
    private serviceService: ServiceService,
    private salesService :SalesService,
    private clientService : ClientService,
    private employeeService : EmployeeService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getClients();
    this.getEmployes();
    this.getProducts();
    this.getSaleDetail();
  }
  getSaleDetail(){
    this.salesService.detailSale(Number(this.salesId)).subscribe(
      (response : any)=>{
        this.detailSale = SaleDetailTransformer(response);
        this.clientId = this.detailSale[0].clientSale
        this.employeeId = this.detailSale[0].employeeSale
        this.discount = this.detailSale[0].discount
        this.tax = this.detailSale[0].tax
        this.total = this.detailSale[0].totalSale
        this.notes = this.detailSale[0].notes
        this.saleId = this.detailSale[0].saleId
        
        this.sales = {
          ...this.sales,
          client:{clientId:this.clientId},
          employee:{employeeId:this.employeeId},
          total:this.total,
          tax:this.tax,
          subtotal:this.detailSale[0].subtotalSale,
          notes:this.notes,
          saleId:this.saleId,
          discountSale:this.detailSale[0].discountSale
        }
        
      }
    )
  }

  getClients() {
    this.clientService.get().subscribe(
      (response: any) => {
        this.clients = ClientsTransformer(response);
      }
    );
  }

  getEmployes() {
    this.employeeService.get().subscribe(
      (response: any) => {
        this.employee = EmployesTransformer(response);
      }
    );
  }

  getMessageValidate(field: string) {
    const response: any = this.validates.find((e: any) => e.field == field);
    return response ? response.message : null;
  }

  selectedClient(){
    this.sales = {
      ...this.sales,
      client: {
        clientId: Number(this.clientId)
      }
    }
  }

  selectedEmployeeDetail(i:any,e:any){
     this.detailSale[i].employee = parseInt(e.target.value)
   }
 
  searchProduct(){
    this.ChilTablePaginationComponent.getChangeTable();
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
          this.toastr.success('sale update successfully');
          this.router.navigate(['!/sales']);
        }
      );
    }
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
    this.detailSale[i].subtotal = this.detailSale[i].amount * this.detailSale[i].price
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

  deleteDetail(i:any){
    this.detailSale.splice(i,1)
    if(this.detailSale.length > 0) {
      const totals  = this.detailSale.map(e=>e.total)   
      const sum = totals.reduce((accumulator, current) => accumulator + current);
      const totalsDiscount  = this.detailSale.map(e=>e.discount)  
      const sumDiscount = totalsDiscount.reduce((accumulator, current) => accumulator + current); 
      this.sales.discountSale = parseFloat((sumDiscount).toFixed(2))
      this.sales.subtotal = parseFloat((sum).toFixed(2))
      this.sales.tax = parseFloat((sum - (sum/1.18)).toFixed(2))
      this.sales.total = parseFloat((this.sales.subtotal + this.sales.tax).toFixed(2))
    }else{
      this.sales.subtotal = 0
      this.sales.tax = 0
      this.sales.total = 0
      this.sales.discountSale = 0
    }
    if(this.detailSale.length > 0){
      this.activeButon = false
    }else{
      this.activeButon = true
    }
  }
  selectProduct(element: any){
    const detalle:DetailSalesDTO = {reference:element.description,
                        idItem:element.productId ?element.productId :element.serviceId,
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

  selectedEmployee(){
    this.sales = {
      ...this.sales,
      employee:{
        employeeId:Number(this.employeeId)
      }
    }
  }

  getTableTabs(event: any) {
    if (event.index === 0) this.getProducts();
    if (event.index === 1) this.getServices();
    
    this.tabIndex = event.index;
  }
  
  search(){
    this.ChilTablePaginationComponent.getChangeTable();
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
}
