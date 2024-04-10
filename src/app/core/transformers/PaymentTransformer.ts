
import { ServiceDTO } from "../interfaces/ServiceDTO";


export const PaymentTransformer = (payment: any) => {
    return {
        idFormapago: payment.paymentId,
        tipo: payment.type,
    }
}

export const PaymentsTransformer = (payment: any[]) => {
    return payment.map((e) => {
        return {
            paymentId:e.idFormapago,
            type:e.tipo
       
        }
    });
}