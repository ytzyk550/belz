import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() formGroup: FormGroup
  @Input() inputs = []
  @Output() formData = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    let data = this.formGroup.value
    this.formData.emit(data)
  }

}
