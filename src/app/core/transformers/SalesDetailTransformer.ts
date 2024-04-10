



export const SaleDetailTransformer = (saleDetail: any[]) => {
    return saleDetail.map((e) => {
        return {
            amount: e.cantidad,
            discount :e.descuento,
            employee: e.empleado.idEmpleado,
            total:e.importe,
            price:e.precioventa,
            subtotal:e.subtotal,
            date: e.venta.fecha,
            tax: e.venta.impuesto,
            notes: e.venta.notas,
            totalSale:e.venta.total,
            discountSale: e.venta.descuento,
            paymentSale:e.venta.pagoVenta.idFormapagoventa,
            clientSale:e.venta.cliente.idCliente,
            subtotalSale:e.venta.subtotal,
            employeeSale:e.venta.empleado.idEmpleado,
            saleId:e.venta.idVenta,
            tipoItem:e.tipoItem.idTipoDetalleventas,
            idDetailSale:e.idDetalleventa,
            reference:e.descripcion,
            idItem:e.idItem  
        }
    })


}