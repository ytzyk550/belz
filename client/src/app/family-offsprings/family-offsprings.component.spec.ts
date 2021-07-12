import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyOffspringsComponent } from './family-offsprings.component';

describe('FamilyOffspringsComponent', () => {
  let component: FamilyOffspringsComponent;
  let fixture: ComponentFixture<FamilyOffspringsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyOffspringsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyOffspringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
