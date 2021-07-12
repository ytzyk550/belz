import { RequestsService } from './../requests.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-family-add',
  templateUrl: './family-add.component.html',
  styleUrls: ['./family-add.component.css']
})
export class FamilyAddComponent implements OnInit {

  formInputs = [
    { control: 'family_name',  label: 'משפחה'},
    { control: 'father',  label: 'אב'},
    { control: 'mother',  label: 'אם'},
    { control: 'father_phone',  label: 'טלפון אב'},
    { control: 'mother_phone',  label: 'טלפון אם'},
    { control: 'phone',  label: 'טלפון'},
    { control: 'fax',  label: 'פקס'},
    { control: 'address',  label: 'כתובת'},
    { control: 'city',  label: 'עיר'}
  ]

  form = this.fb.group({
    family_name: [''],
    father: [''],
    mother: [''],
    father_phone: [''],
    mother_phone: [''],
    phone: [''],
    fax: [''],
    address: [''],
    city: ['']
  })

  
  constructor(
    public fb: FormBuilder,
    public requestsService: RequestsService
  ) { }

  ngOnInit(): void {
  }

  create(data){
    console.log(data);
    this.requestsService.postRequest('/family/add', data).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
      
    })
  }

}
