import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-family-offsprings',
  templateUrl: './family-offsprings.component.html',
  styleUrls: ['./family-offsprings.component.css']
})
export class FamilyOffspringsComponent implements OnInit {

  familyId = 0
  childrenList = []

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
  columns = []
  
  constructor(
    public requests: RequestsService,
    public router: Router
  ) {
    this.familyId = parseInt(this.router.url.split('/')[2])
    this.columnsData.forEach(c => this.columns.push(c.name))
   }

  ngOnInit(): void {
    this.getChildren()    
  }
  
  getChildren(){
    this.requests.getRequest('/familyChildren/'+this.familyId).subscribe(res=>{
      console.log(res);
      this.childrenList = res
    })
  }


}
