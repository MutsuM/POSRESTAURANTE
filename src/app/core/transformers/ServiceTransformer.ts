import { ServiceDTO } from "../interfaces/ServiceDTO";

export const ServiceTransformer = (service: ServiceDTO) => {
    return {
        idServicios: service.serviceId,
        referencia: service.reference,
        descripcion: service.description,
        precio: service.price,
        duracion: service.duration,
        activo: service.active,
        categoria: {
            idCategoria:service.category.categoryId
        }
    }
}

export const ServicesTransformer = (service: any[]) => {
    return service.map((e) => {
        return {
            serviceId: e.idServicios,
            reference: e.referencia,
            description: e.descripcion,
            price: e.precio,
            duration: e.duracion,
            active: e.activo,
            categoryDescription:e.categoria.descripcion,
            category: {
                categoryId: e.categoria.idCategoria,
                description: e.categoria.descripcion,
                color: e.categoria.color,
                commission: e.categoria.comision,
            },
        }
    });
}