import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

interface Header {
  name: string;
  column: string;
  show: boolean;
}

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent implements OnInit, OnChanges {

  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  @Input() headers: Header[] = [];
  @Input() itemsPerPage: number = 0;
  @Input() currentPage: number = 0;
  @Input() totalItems: number = 0;
  @Input() id: string = '';

  @Input() search: string = '';

  row: any[] = [];
  p: number = 1;
  pageTotal = 0;
  
  objectKeys = Object.keys;
  
  config = {
    itemsPerPage: this.itemsPerPage,
    currentPage: this.currentPage,
    totalItems: this.totalItems,
    id:this.id,
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.search.currentValue) {
      this.config.currentPage = 0;
    }
  }
  getChangeTable() {
    console.log(this.search)
    console.log(this.row)
  }
 
  pageChanged(event: any) {
    console.log(event)
    this.config.currentPage = event;
  }

  editEmit(element: any) {
    this.edit.emit(this.formatObjet(element));
  }

  deleteEmit(element: any) {
    this.delete.emit(this.formatObjet(element));
  }
  selectSales(element: any) {
    this.select.emit(this.formatObjet(element));
  }

  formatObjet(element: any) {
    let objectRow = {};
    for (let i = 0; i < this.headers.length; i++) {
      objectRow = {
        ...objectRow,
        [this.headers[i].column]: element[this.headers[i].column].value
      }
    }

    return objectRow;
  }

  getTable(dataTable: any) {
    this.row = [];
    console.log('dataTable', dataTable);
    for (let i = 0; i < dataTable.length; i++) {
      let dataObject = {};
      for (let j = 0; j < this.headers.length; j++) {
        const column = dataTable[i][this.headers[j].column];
        if(column !== null || column !== undefined){
          dataObject = {
            ...dataObject,
            [this.headers[j].column]: { show: this.headers[j].show, 
              value: 
              // (typeof column === 'object') ? 
              // (column?.description ? column?.description : column.type) 
              // : column
              column
             }
            }
        }}
    
      this.row.push(dataObject);
    }

    this.config = {
      id:this.id,
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.row.length,
    };

    this.pageTotal = Math.ceil(this.config.totalItems / this.config.itemsPerPage);
    console.log(this.pageTotal)
    console.log(this.itemsPerPage)
    console.log(this.currentPage)
  }

}
