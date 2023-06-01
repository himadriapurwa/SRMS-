import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEditRequestComponent } from './emp-edit-request.component';

describe('EmpEditRequestComponent', () => {
  let component: EmpEditRequestComponent;
  let fixture: ComponentFixture<EmpEditRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpEditRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpEditRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
