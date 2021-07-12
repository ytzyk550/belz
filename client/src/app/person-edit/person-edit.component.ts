import { RequestsService } from './../requests.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  personId = 0

  formInputs = [
    { control: 'first_name', label: 'שם פרטי' },
    { control: 'last_name',  label: 'שם משפחה'},
    { control: 'id_number',  label: 'ת.ז.'},
    { control: 'birth_date',  label: 'ת. לידה'},
    { control: 'father',  label: 'אב'},
    { control: 'mother',  label: 'אם'},
    { control: 'spouse',  label: 'ב.ז.'},
    { control: 'gender',  label: 'ז/נ'},
    { control: 'marital_status',  label: 'מצב אישי'}
  ]

  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    id_number: [''],
    birth_date: [''],
    father: [''],
    mother: [''],
    spouse: [''],
    gender: [''],
    marital_status: ['']
  })

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public requestsService: RequestsService,
    public actRoute: ActivatedRoute
  ) { 
      this.personId = this.actRoute.snapshot.params['id']
    }

  ngOnInit(): void {
    this.getPersonData()
  }

  getPersonData(){
    this.requestsService.getRequest('/person/'+this.personId).subscribe( res => {
      console.log(res);    
      this.assignForm(res)  
    }, err => {
      console.log(err);
    })
  }

  assignForm(data){
    Object.keys(data).forEach(k => {
      this.setInput(k, data[k])
    });
  }

  setInput(control, value){
    if (this.form.get(control)) {
      this.form.get(control).patchValue(value, {onlySelf: true})
      this.form.get(control).updateValueAndValidity() 
    }
  }

  edit(data){
    console.log(data);
    data.id = this.personId
    this.requestsService.postRequest('/person/update', data).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
      
    })
  }
}
