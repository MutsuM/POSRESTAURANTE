import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../core/services/Category.service';
import { CategoryDTO } from '../../../core/interfaces/CategoryDTO';
import { CategoriesTransformer } from '../../../core/transformers/CategoryTransformer';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TablePaginationComponent } from '../../../shared/components/table-pagination/table-pagination.component';
import { Router } from '@angular/router';
import { PrefixUrl } from '../../../core/constants/index';

interface Header {
  name: string;
  column: string;
  show: boolean;
}

@Component({
  selector: 'app-lst-category',
  templateUrl: './lst-category.component.html',
  styleUrls: ['./lst-category.component.css']
})
export class LstCategoryComponent implements OnInit {

  @ViewChild(TablePaginationComponent) ChilTablePaginationComponent: any;

  categories: CategoryDTO[] = [];
  searchText: any
  headers: Header[] = [
    { name: 'ID', column: 'categoryId', show: false },
    { name: "COLOR", column: 'color', show: true },
    { name: "COMISION", column: 'commission', show: false },
    { name: "DESCRIPCIÓN", column: 'description', show: true }
  ]

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.get().subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.categories = CategoriesTransformer(response);
          this.ChilTablePaginationComponent.getTable(this.categories);
        }
      }
    )
  }

  redirectUpdate(element: any) {
    this.router.navigate([`/${PrefixUrl}/categories/update/${element.categoryId}`]);
  }

  delete(element: any) {
    Swal.fire({
      title: `¿Desea eliminar la categoria ${element.description + " " + element.color}?`,
      text: 'Una vez eliminado no podrá recuperar esta categoria',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(element.categoryId).subscribe(
          (response) => {
            if (response) {
              this.getCategories();
              this.toastr.success(`Category ${element.description + " " + element.color} deleted successfully`);
            }
          },
          (error) => {
            this.toastr.error(`${error.message}`);
          }
        );
      }
    });
  }

}
