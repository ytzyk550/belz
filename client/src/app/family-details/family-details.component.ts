import { RequestsService } from './../requests.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent implements OnInit {

  familyId = 0
  
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
    public router: Router,
    public requestsService: RequestsService,
  ) {
    this.familyId = parseInt(this.router.url.split('/')[2])
  }

  ngOnInit(): void {
    this.getFamilyData()
  }

  getFamilyData(){
     
    this.requestsService.getRequest('/family/'+this.familyId).subscribe( res => {
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
    data.id = this.familyId
    this.requestsService.postRequest('/person/update', data).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
      
    })
  }

}
