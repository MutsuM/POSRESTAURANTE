import { CategoryDTO } from './CategoryDTO';
import { ProviderDTO } from './ProviderDTO';

export interface ProductDTO {
    productId?: number;
    barCode: string;
    reference: string;
    description: string;
    stock: string;
    minimumOrder: string;
    minimumStock: string;
    salePrice: string;
    saleCost: string;
    availableSale?: boolean;
    active?: boolean;
    category?: CategoryDTO;
    providers?: ProviderDTO
  }