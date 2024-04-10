import { ProductDTO } from "../interfaces/ProductDTO";

export const ProductTransformer = (product: ProductDTO) => {
    return {
        idProductos: product.productId,
        codigoBarras: product.barCode,
        referencia: product.reference,
        descripcion: product.description,
        stock: product.stock,
        pedidoMinimo: product.minimumOrder,
        stockMinimo: product.minimumStock,
        precioventa: product.salePrice,
        preciocosto: product.saleCost,
        disponibleVenta: product.availableSale,
        activo: product.active,
        categoria: {
            idCategoria:product.category?.categoryId
        },
        proveedores:{
            idProveedor:product.providers?.providerId
        }
    }
}

export const ProductsTransformer = (product: any[]) => {
    return product.map((e) => {
        return {
            productId: e.idProductos,
            barCode: e.codigoBarras,
            reference: e.referencia,
            description: e.descripcion,
            stock: e.stock,
            minimumOrder: e.pedidoMinimo,
            minimumStock: e.stockMinimo,
            salePrice: e.precioventa,
            saleCost: e.preciocosto,
            availableSale: e.disponibleVenta,
            active: e.activo,
            categoryDescription:e.categoria.descripcion,
            category: {
                categoryId: e.categoria.idCategoria,
                description: e.categoria.descripcion,
                color: e.categoria.color,
                commission: e.categoria.comision,
            },
            providers: {
                providerId: e.proveedores.idProveedor,
                name: e.proveedores.nombre,
                telephone: e.proveedores.telefono,
                email: e.proveedores.email,
                contactPerson: e.proveedores.personaContacto,
                notes: e.proveedores.notas,
                weyToPay: e.proveedores.formaPago
            }
        }
    });
}