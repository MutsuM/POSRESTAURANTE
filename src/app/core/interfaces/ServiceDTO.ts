import { CategoryDTO } from './CategoryDTO';

export interface ServiceDTO {
    serviceId?: number;
    reference: string;
    description: string;
    price: string;
    duration: string;
    active: boolean;
    category: CategoryDTO;
}