import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.css']
})
export class BasicTableComponent implements OnInit {

  @Input() tableData = []
  @Input() columnsData = []
  @Input() columns = []
  constructor() { }

  ngOnInit(): void {
  }

}
