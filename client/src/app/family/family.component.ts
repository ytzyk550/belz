import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  links = [
    {path:'details', label:'פרטים', isActive: true},
    {path:'offsprings', label:'צאצאים', isActive: false},
    {path:'history', label:'הסטוריית כניסות', isActive: false}

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
