import { ProviderDTO } from "../interfaces/ProviderDTO";

export const ProviderTransformer = (provider: ProviderDTO) => {
    return {
        idProveedor: provider.providerId,
        nombre: provider.name,
        telefono: provider.telephone,
        email: provider.email,
        personaContacto: provider.contactPerson,
        notas: provider.notes,
        formaPago: {
            idFormapago: provider.weyToPay?.paymentId
        }
    }
}

export const ProvidersTransformer = (provider: any[]) => {
    return provider.map((e) => {
        return {
            providerId: e.idProveedor,
            name: e.nombre,
            telephone: e.telefono,
            email: e.email,
            contactPerson: e.personaContacto,
            notes: e.notas,
            weyToPayType:e.formaPago.tipo,
            weyToPay: {
                paymentId: e.formaPago.idFormapago,
                type: e.formaPago.tipo
            }
        }
    });
}