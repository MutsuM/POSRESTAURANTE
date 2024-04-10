import { ClientDTO } from "./ClientDTO";
import { DetailSalesDTO } from "./DetailSalesDTO";
import { EmployeeDTO } from "./EmployeeDTO";
import { SalePaymentDTO } from "./SalePaymentDTO";

export interface SalesDTO {
    client?: ClientDTO,
    employee?: EmployeeDTO,
    date?: any,
    saleId?: number,
    tax: number,
    notes: string,
    salePayment?: SalePaymentDTO,
    total: number,
    subtotal:number,
    detailSales: DetailSalesDTO[],
    discountSale:number
}