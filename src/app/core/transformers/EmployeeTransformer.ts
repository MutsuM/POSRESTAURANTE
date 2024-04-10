import { EmployeeDTO } from "../interfaces/EmployeeDTO";

// export const EmployeeTransformer = (employee: EmployeeDTO) => {
//     return {
//         apellido: employee.lastName,
//         colorCitas: employee.colorQuote,
//         email: employee.email,
//         idEmpleado: employee.employeeId,
//         nombres: employee.names
//     }
// }

export const EmployesTransformer = (employee: any[]) => {
    return employee.map((e) => {
        return {
            employeeId: e.idEmpleado,
            lastName: e.apellidos,
            colorQuote: e.colorCitas,
            email: e.email,
            names: e.nombres
        }
    });
}