import { Component, OnInit } from '@angular/core';
import { URL } from '../../../core/helpers/url';
import { PrefixUrl } from '../../../core/constants/index';
import { ToastrService } from 'ngx-toastr';
import { ServiceDTO } from '../../../core/interfaces/ServiceDTO';
import { CategoryDTO } from '../../../core/interfaces/CategoryDTO';
import { fields } from '../../../core/helpers/validateFields';
import { ServiceService } from '../../../core/services/Service.service';
import { CategoryService } from '../../../core/services/Category.service';
import { ServiceTransformer, ServicesTransformer } from '../../../core/transformers/ServiceTransformer';
import { CategoriesTransformer } from '../../../core/transformers/CategoryTransformer'
@Component({
  selector: 'app-upd-service',
  templateUrl: './upd-service.component.html',
  styleUrls: ['./upd-service.component.css']
})
export class UpdServiceComponent implements OnInit {

  Prefix = PrefixUrl;

  categories: CategoryDTO[] = [];
  categoryId: any = 0;
  msgCategory: string = '';
  serviceId: string = this.url.latestUrl();
  service: ServiceDTO = {
    serviceId: 0,
    reference: '',
    description: '',
    category: {
      categoryId: 0
    },
    price: '',
    duration: '',
    active: false
  }
  validates: [] = [];

  constructor(
    private url: URL,
    private categoryService: CategoryService,
    private serviceService: ServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getService();
  }

  getService() {
    this.serviceService.getById(Number(this.serviceId)).subscribe(
      (response: any) => {
        this.service = ServicesTransformer([response])[0];
        this.categoryId = this.service.category.categoryId;
      }
    );
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

  selectedCategory() {
    this.service = {
      ...this.service,
      category: {
        categoryId: Number(this.categoryId)
      }
    }
  }

  saveService() {
    const response: any = fields(this.service);
    this.msgCategory = this.categoryId == 0 ? 'Field is required' : '';
    this.validates = (!response) ? [] : response;
    if (!response && this.msgCategory === '') {
      this.serviceService.save(ServiceTransformer(this.service)).subscribe(
        (response: any) => {
          this.toastr.success('Service update successfully');
          this.cleanForm();
        }
      );
    }
  }
  cleanForm() {
    this.service = {
      reference: '',
      description: '',
      price: '',
      duration: '',
      active: true,
      category: {
        categoryId: 0
      }
    };
    this.categoryId = 0;
  }
}
