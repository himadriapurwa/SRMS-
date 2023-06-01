import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpFeedbackComponent } from './emp-feedback.component';

describe('EmpFeedbackComponent', () => {
  let component: EmpFeedbackComponent;
  let fixture: ComponentFixture<EmpFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
