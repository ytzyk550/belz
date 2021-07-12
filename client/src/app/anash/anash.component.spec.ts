import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnashComponent } from './anash.component';

describe('AnashComponent', () => {
  let component: AnashComponent;
  let fixture: ComponentFixture<AnashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
