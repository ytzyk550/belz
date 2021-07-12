import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.css']
})
export class FamiliesComponent implements OnInit {

  familiesList = []
  
  columnsData = [
    {name: 'id', header: '#'},
    {name: 'family_name', header: 'שם משפחה'},
    {name: 'father', header: 'שם האב'},
    {name: 'mother', header: 'שם האם'},
    {name: 'phone', header: 'טלפון'},
    {name: 'father_phone', header: 'טלפון אב'},
    {name: 'mother_phone', header: 'טלפון אם'},
    {name: 'fax', header: 'פקס'},
    {name: 'address', header: 'כתובת'},
    {name: 'city', header: 'עיר'},
    {name: 'last_update', header: 'עדכון אחרון'}
  ]
  columns = []
  constructor(
    public requests: RequestsService,
    public router: Router
  ) {
    this.columnsData.forEach(c => this.columns.push(c.name))
   }

  ngOnInit(): void {
    this.requests.getRequest('/families/list').subscribe(res=>{
      console.log(res);
      this.familiesList = res
    })
  }

  rowClick(row){
    console.log(row);
    this.router.navigate(['/family', row.id, 'details'])
  }

  editRow(row){
    console.log(row);
  }

  deleteRow(row){
    console.log(row);
  }

  create(){
    this.router.navigate(['/family/add'])

  }

}
