import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovalRequestsComponent } from './admin-approval-requests.component';

describe('AdminApprovalRequestsComponent', () => {
  let component: AdminApprovalRequestsComponent;
  let fixture: ComponentFixture<AdminApprovalRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApprovalRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApprovalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
