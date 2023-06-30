import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeNavComponent } from './attendee-nav.component';

describe('AttendeeNavComponent', () => {
  let component: AttendeeNavComponent;
  let fixture: ComponentFixture<AttendeeNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendeeNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
