import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L1AttendeeComponent } from './l1-attendee.component';

describe('L1AttendeeComponent', () => {
  let component: L1AttendeeComponent;
  let fixture: ComponentFixture<L1AttendeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L1AttendeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L1AttendeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
