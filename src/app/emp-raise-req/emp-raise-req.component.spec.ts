import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpRaiseReqComponent } from './emp-raise-req.component';

describe('EmpRaiseReqComponent', () => {
  let component: EmpRaiseReqComponent;
  let fixture: ComponentFixture<EmpRaiseReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpRaiseReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpRaiseReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
