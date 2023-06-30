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
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AdminNavComponent } from './layout/admin-nav/admin-nav.component';
import { EmpNavComponent } from './layout/emp-nav/emp-nav.component';
import { AttendeeNavComponent } from './layout/attendee-nav/attendee-nav.component';
import { AttendeeDetailsComponent } from './attendee-details/attendee-details.component';

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
    LandingPageComponent,
    BarChartComponent,
    AdminNavComponent,
    EmpNavComponent,
    AttendeeNavComponent,
    AttendeeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    DataTablesModule,
    NgChartsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

  