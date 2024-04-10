import { ClientDTO } from "../interfaces/ClientDTO";

export const ClientTransformer = (client: ClientDTO) => {
    return {
        idCliente: client.clientId,
        nombres: client.names,
        apellidoPat: client.lastNameFat,
        apellidoMat: client.lastNameMot,
        sexo: client.gender,
        telefono: client.telephone,
        correo: client.email,
        provincia: client.province,
        fechaNac: client.dateBirth,
        dni: client.identity,
        direccion: client.direction,
        ciudad: client.city,
        codigoPostal: client.postalCode,
        infoClinica: client.infoClinical,
        notas: client.notes,
        enviosSms: client.sendSms,
        envioCorreo: client.sendEmail,
        activo: client.active,
    }
}

export const ClientsTransformer = (client: any[]) => {
    return client.map((e) => {
        return {
            clientId: e.idCliente,
            names: e.nombres,
            lastNameFat: e.apellidoPat,
            lastNameMot: e.apellidoMat,
            gender: e.sexo,
            telephone: e.telefono,
            email: e.correo,
            province: e.provincia,
            dateBirth: e.fechaNac,
            identity: e.dni,
            direction: e.direccion,
            city: e.ciudad,
            postalCode: e.codigoPostal,
            infoClinical: e.infoClinica,
            notes: e.notas,
            sendSms: e.enviosSms,
            sendEmail: e.envioCorreo,
            active: e.activo ,

        }
    });
}