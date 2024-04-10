import { PaymentDTO } from './PaymentDTO';

export interface ProviderDTO {
    providerId?: Number;
    name?: String;
    telephone?: String;
    email?: String;
    contactPerson?: String;
    notes?: String;
    weyToPay?: PaymentDTO;
}

