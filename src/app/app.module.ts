import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

import { DataTablesModule } from "angular-datatables";

import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { EmployeeScreenComponent } from './employee-screen/employee-screen.component';
import { L1AttendeeComponent } from './l1-attendee/l1-attendee.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { EmpEditRequestComponent } from './emp-edit-request/emp-edit-request.component';
import { AdminApprovalRequestsComponent } from './admin-approval-requests/admin-approval-requests.component';
import { AttendeeRatingsComponent } from './attendee-ratings/attendee-ratings.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { EmpHistoryComponent } from './emp-history/emp-history.component';
import { EmpFeedbackComponent } from './emp-feedback/emp-feedback.component';
import { EmpRaiseReqComponent } from './emp-raise-req/emp-raise-req.component';
import { ModalComponent } from './modal/modal.component';
import { AttendeePendingReqComponent } from './attendee-pending-req/attendee-pending-req.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    EmployeeScreenComponent,
    L1AttendeeComponent,
    AdminHistoryComponent,
    EmpEditRequestComponent,
    AdminApprovalRequestsComponent,
    AttendeeRatingsComponent,
    CategoryDetailsComponent,
    EmpHistoryComponent,
    EmpFeedbackComponent,
    EmpRaiseReqComponent,
    ModalComponent,
    AttendeePendingReqComponent,
    LandingPageComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

  