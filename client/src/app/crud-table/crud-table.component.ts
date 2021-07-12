import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css']
})
export class CrudTableComponent implements OnInit {

  @Input() tableData = []
  @Input() columnsData = []
  @Input() columns = []
  @Output() onRowClick = new EventEmitter()
  @Output() onEdit = new EventEmitter()
  @Output() onDelete = new EventEmitter()
  @Output() onCreate = new EventEmitter()
  
  constructor() { }

  ngOnInit(){
    this.columns.push('action')
  }

  rowClick(row){
    this.onRowClick.emit(row)
  }

  editClick(e, row){
    e.stopPropagation()
    this.onEdit.emit(row)
  }

  deleteClick(e, row){
    e.stopPropagation()
    this.onDelete.emit(row)
  }

  createClick(){
    this.onCreate.emit()
  }
}
