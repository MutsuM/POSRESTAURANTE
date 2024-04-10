import { SalesDTO } from "../interfaces/SalesDTO";

export const SalesTransformer = (sales: SalesDTO) => {
    return {
        cliente: { idCliente: sales.client?.clientId },
        descuento: sales.discountSale,
        empleado: { idEmpleado: sales.employee?.employeeId },
        fecha: sales.date,
        idVenta: sales.saleId,
        impuesto: sales.tax,
        notas: sales.notes,
        // detalleVenta:[{
        //     cantidad:sales.detailSales?
        // }],
        detalleVenta: sales.detailSales.map(e => {
            return {
                cantidad: e.amount,
                descuento: e.discount,
                empleado:{idEmpleado:e.employee},
                idItem:e.idItem,
                importe:e.total,
                precioventa:e.price,
                tipoItem:{idTipoDetalleventas:e.tipoItem},
                idDetalleventa:e.idDetailSale,
                descripcion:e.reference,
                subtotal:e.subtotal
            }
        }),
        pagoVenta: { idFormapagoventa: sales.salePayment?.formPaymentSaleId },
        total: sales.total,
        subtotal:sales.subtotal
    }
}

export const SaleTransformer = (sales: any[]) => {
    return sales.map((e) => {
        return {
            clientName: e.cliente.nombres,
            salePaymentName :e.pagoVenta.descripcion,
            client: {
                clientId: e.cliente.idCliente,
                names: e.cliente.nombres,
                lastNameFat: e.cliente.apellidoPat,
                lastNameMot: e.cliente.apellidoMat,
                gender: e.cliente.sexo
            },
            discountSale: e.descuento,
            employeeName: e.empleado.nombres,
            employee: {
                employeeId: e.empleado.idEmpleado,
                names: e.empleado.nombres,
                lastName: e.empleado.apellidos,
            },
            date: e.fecha,
            saleId: e.idVenta,
            tax: e.impuesto,
            notes: e.notas,
            salePayment: {
                formPaymentSaleId: e.pagoVenta.idFormapagoventa,
                description: e.pagoVenta.descripcion
            },
            total: e.total,
            subtotal:e.subtotal,
            detailSales: []
        }
    })


}