import { Component, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/core/interfaces/CategoryDTO';
import { CategoryService } from 'src/app/core/services/Category.service';
import { PrefixUrl } from '../../../core/constants/index';
import { CategoryTransformer } from '../../../core/transformers/CategoryTransformer';
import { CategoriesTransformer } from '../../../core/transformers/CategoryTransformer';
import { ToastrService } from 'ngx-toastr';
import { fields } from '../../../core/helpers/validateFields';
import { URL } from '../../../core/helpers/url';

@Component({
  selector: 'app-upd-category',
  templateUrl: './upd-category.component.html',
  styleUrls: ['./upd-category.component.css']
})
export class UpdCategoryComponent implements OnInit {

  Prefix = PrefixUrl;
   category: CategoryDTO  = {description: '', color: '', commission: 0};
  //category: CategoryDTO  = {description: '', color: '', commission: 0};
  constructor(
    private url: URL,
    private toastr: ToastrService,
    private categoryService: CategoryService,
  ) { }
  validates: [] = [];
  categoryId: string = this.url.latestUrl();
  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getById(Number(this.categoryId)).subscribe(
      (response: any) => {
        this.category = CategoriesTransformer([response])[0];
      }
    );
  }

  getMessageValidate(field: string) {
    const response: any = this.validates.find((e: any) => e.field == field);
    return response ? response.message : null;
  }

  save() {
    const response: any = fields(this.category);
    this.validates = (!response) ? [] : response;
    if (!response) {
      this.categoryService.save(CategoryTransformer(this.category)).subscribe(
        (response: any) => {
          this.toastr.success('Category updated successfully');
         // this.cleanForm();
        }
      );
    }
  }
  cleanForm(){
    this.category =  {
      description: '',
      color: '',
      commission: 0
    };
  }
}
