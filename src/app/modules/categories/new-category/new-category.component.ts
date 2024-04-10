import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryDTO } from '../../../core/interfaces/CategoryDTO';
import { CategoryService } from '../../../core/services/Category.service';
import { CategoryTransformer } from '../../../core/transformers/CategoryTransformer';
import { ToastrService } from 'ngx-toastr';
import { fields } from '../../../core/helpers/validateFields';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  @Output() getCategories: EventEmitter<any> = new EventEmitter<any>();

  category: CategoryDTO = { description: '', color: '', commission: 0 };
  validates: [] = [];

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  save() {
    const response: any = fields(this.category);
    this.validates = (!response) ? [] : response;
    if (!response) {
      this.categoryService.save(CategoryTransformer(this.category)).subscribe(
        (response: any) => {
          this.toastr.success('Category created successfully');
          this.cleanForm();
          this.getCategories.emit();
        }
      );
    } 
  }
  
  getMessageValidate(field: string) {
    const response: any = this.validates.find((e: any) => e.field == field);
    return response ? response.message : null;
  }

  cleanForm() {
    this.category = {
      description: '',
      color: '',
      commission: 0,
    }
  }

}
