import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeScreenComponent } from './employee-screen/employee-screen.component';
import { L1AttendeeComponent } from './l1-attendee/l1-attendee.component'; 
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { EmpEditRequestComponent } from './emp-edit-request/emp-edit-request.component';
import { AdminApprovalRequestsComponent } from './admin-approval-requests/admin-approval-requests.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

import { EmpHistoryComponent } from './emp-history/emp-history.component';
import { EmpRaiseReqComponent } from './emp-raise-req/emp-raise-req.component';
import { AttendeeRatingsComponent } from './attendee-ratings/attendee-ratings.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
const routes: Routes = [
  {
  path: '',
  component: LayoutComponent,
  children:[
    { path: 'dashboard', loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'user', loadChildren: () => import('./layout/user/user.module').then(m => m.UserModule) }
  ]
},
{
  path:'login', component:LoginComponent
},
{
  path:'l1-attendee', component:L1AttendeeComponent
},
{
  path:'admin-history', component:AdminHistoryComponent
},
{
  path:'emp-edit-request', component:EmpEditRequestComponent
},
{
  path:'admin-approval-requests', component:AdminApprovalRequestsComponent
},
{
  path:'category-details', component:CategoryDetailsComponent
},
{
  path:'emp-history', component:EmpHistoryComponent
},
{
  path:'emp-raise-req', component:EmpRaiseReqComponent
},
{
  path:'attendee-ratings', component:AttendeeRatingsComponent
},
{
  path:'landing-page', component:LandingPageComponent
},
{
  path: '',
  component: EmployeeScreenComponent,
  children:[
    { path: 'raise-newrequest', loadChildren: () => import('./employee-screen/raise-newrequest/raise-request.module').then(m => m.RaiseRequestModule) }
  ]
},

  { path: 'employee-history', loadChildren: () => import('./employee-screen/employee-history/employee-history.module').then(m => m.EmployeeHistoryModule) },

  { path: 'feedback', loadChildren: () => import('./employee-screen/feedback/feedback.module').then(m => m.FeedbackModule) }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
