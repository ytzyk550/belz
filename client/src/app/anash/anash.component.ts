import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-anash',
  templateUrl: './anash.component.html',
  styleUrls: ['./anash.component.css']
})
export class AnashComponent implements OnInit {

  anashList = []

  columnsData = [
    {name: 'id', header: '#'},
    {name: 'first_name', header: 'שם פרטי'},
    {name: 'last_name', header: 'שם משפחה'},
    {name: 'id_number', header: 'ת.ז.'},
    {name: 'birth_date', header: 'ת. לידה'},
    {name: 'gender', header: 'ז/נ'},
    {name: 'marital_status', header: 'מצב אישי'},
    {name: 'last_update', header: 'עדכון אחרון'}
  ]
  columns = ['id', 'first_name', 'last_name', 'id_number', 'birth_date', 'gender', 'marital_status', 'last_update']
  constructor(
    public requests: RequestsService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.requests.getRequest('/anash/list').subscribe(res=>{
      console.log(res);
      this.anashList = res
    })
  }

  rowClick(row){
    console.log(row);
    // this.router.navigate(['/family', row.id, 'details'])
  }

  editRow(row){
    console.log(row);
    this.router.navigate(['/person/edit', row.id])

  }

  deleteRow(row){
    console.log(row);
  }

  create(){
    console.log('create');
    this.router.navigate(['/person/add'])

  }
}
