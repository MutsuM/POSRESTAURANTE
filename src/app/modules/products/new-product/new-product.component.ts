import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../../../core/interfaces/ProductDTO';
import { CategoryDTO } from '../../../core/interfaces/CategoryDTO';
import { ProviderDTO } from '../../../core/interfaces/ProviderDTO';
import { PrefixUrl } from '../../../core/constants/index';
import { fields } from '../../../core/helpers/validateFields';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../core/services/Category.service';
import { ProductService } from '../../../core/services/Product.service';
import { ProviderService } from '../../../core/services/Provider.service';
import { ProductTransformer } from '../../../core/transformers/ProductTransformer';
import { CategoriesTransformer } from 'src/app/core/transformers/CategoryTransformer';
import { ProvidersTransformer } from 'src/app/core/transformers/ProviderTransformer';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  Prefix = PrefixUrl;
  product: ProductDTO = {
    description: '',
    reference: '',
    stock: '',
    minimumOrder: '',
    minimumStock: '',
    salePrice: '',
    saleCost: '',
    barCode: '',
    availableSale: true,
    active: true
  };
  categories: CategoryDTO[] = [];
  providers: ProviderDTO[] = [];
  categoryId: number = 0;
  msgCategory: string = '';
  providerId: number = 0;
  msgProvider: string = '';
  validates: [] = [];

  constructor(
    private categoryService: CategoryService,
    private providerService: ProviderService,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProviders();
  }

  saveProduct() {
    const response: any = fields(this.product);
    this.msgCategory = this.categoryId == 0 ? 'Field is required' : '';
    this.msgProvider =  this.providerId == 0 ? 'Field is required' : '';
    this.validates = (!response) ? [] : response;
    if (!response && this.msgCategory === '' && this.msgProvider === '') {
      this.productService.save(ProductTransformer(this.product)).subscribe(
        (response: any) => {
          this.toastr.success('Product created successfully');
          this.cleanForm();
        }
      );
    }
  }

  getMessageValidate(field: string) {
    const response: any = this.validates.find((e: any) => e.field == field);
    return response ? response.message : null;
  }

  getCategories() {
    this.categoryService.get().subscribe(
      (response: any) => {
        this.categories = CategoriesTransformer(response);
      }
    );
  }

  getProviders() {
    this.providerService.get().subscribe(
      (response: any) => {
        this.providers = ProvidersTransformer(response);
      }
    );
  }

  selectedCategory() {
    this.product = {
      ...this.product,
      category: {
        categoryId: Number(this.categoryId)
      }
    }
  }

  selectedProvider() {
    this.product = {
      ...this.product,
      providers: {
        providerId: Number(this.providerId)
      }
    }
  }

  cleanForm() {
    this.product = {
      description: '',
      reference: '',
      stock: '',
      minimumOrder: '',
      minimumStock: '',
      salePrice: '',
      saleCost: '',
      barCode: '',
      availableSale: false,
      active: false,
    };
    this.categoryId = 0;
    this.providerId = 0;
  }

}
