import { Component, OnInit } from '@angular/core';
import { PrefixUrl } from '../../../core/constants/index';
import { CategoryDTO } from '../../../core/interfaces/CategoryDTO';
import { ToastrService } from 'ngx-toastr';
import { fields } from '../../../core/helpers/validateFields';
import { CategoryService } from '../../../core/services/Category.service';
import { ServiceService } from '../../../core/services/Service.service';
import { ServiceDTO } from '../../../core/interfaces/ServiceDTO';
import { ServiceTransformer } from '../../../core/transformers/ServiceTransformer';
import { CategoriesTransformer } from '../../../core/transformers/CategoryTransformer';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css']
})
export class NewServiceComponent implements OnInit {

  Prefix = PrefixUrl;
  categories: CategoryDTO[] = [];
  categoryId: number = 0;
  msgCategory: string = '';
  service: ServiceDTO = {
    reference: '',
    description: '',
    price: '',
    duration: '',
    active: true,
    category: {
      categoryId: 0
    }
  };
  validates: [] = [];

  constructor(
    private categoryService: CategoryService,
    private serviceService: ServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  saveService() {
    const response: any = fields(this.service);
    this.msgCategory = this.categoryId == 0 ? 'Field is required' : '';
    this.validates = (!response) ? [] : response;

    if (!response && this.msgCategory === '') {
      this.serviceService.save(ServiceTransformer(this.service)).subscribe(
        (response: any) => {
          this.toastr.success('Service created successfully');
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

  selectedCategory() {
    this.service = {
      ...this.service,
      category: {
        categoryId: Number(this.categoryId)
      }
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
