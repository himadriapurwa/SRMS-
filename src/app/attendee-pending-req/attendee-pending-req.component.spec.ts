import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeePendingReqComponent } from './attendee-pending-req.component';

describe('AttendeePendingReqComponent', () => {
  let component: AttendeePendingReqComponent;
  let fixture: ComponentFixture<AttendeePendingReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendeePendingReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeePendingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
