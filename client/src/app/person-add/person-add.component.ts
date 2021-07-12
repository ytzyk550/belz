import { RequestsService } from './../requests.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

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
    public requestsService: RequestsService
  ) { }

  ngOnInit(): void {
  }

  create(data){
    console.log(data);
    this.requestsService.postRequest('/person/add', data).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
      
    })
  }

}
