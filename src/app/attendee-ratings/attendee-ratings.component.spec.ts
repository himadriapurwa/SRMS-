import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeRatingsComponent } from './attendee-ratings.component';

describe('AttendeeRatingsComponent', () => {
  let component: AttendeeRatingsComponent;
  let fixture: ComponentFixture<AttendeeRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendeeRatingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
