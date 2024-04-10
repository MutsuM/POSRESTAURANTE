export interface Product {
    idProductos: Number;
    codigoBarras: Number;
    referencia: String;
    descripcion: String;
    stock: Number;
    pedidoMinimo: Number;
    stockMinimo: Number;
    precioventa: Number;
    preciocosto: Number;
    disponibleVenta: Boolean;
    activo: Boolean;
    categoria: Category;
    proveedores: Provider;
}

interface Category {
    idCategoria: Number;
    descripcion: String;
    color: String;
    comision: Number;
}

interface Provider {
    idProveedor: Number;
    nombre: String;
    telefono: String;
    email: String;
    personaContacto: String;
    notas: String;
    formaPago: Payment
}

interface Payment {
    idFormapago: Number;
    tipo: String;
}