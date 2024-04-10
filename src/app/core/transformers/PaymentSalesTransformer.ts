
import { ServiceDTO } from "../interfaces/ServiceDTO";


export const PaymentSaleTransformer = (SalePaymentDTO: any) => {
    return {
        idFormapagoventa: SalePaymentDTO.formPaymentSaleId,
        descripcion: SalePaymentDTO.description,
    }
}

export const PaymentSalesTransformer = (SalePaymentDTO: any[]) => {
    return SalePaymentDTO.map((e) => {
        return {
            formPaymentSaleId:e.idFormapagoventa,
            description:e.descripcion
       
        }
    });
}