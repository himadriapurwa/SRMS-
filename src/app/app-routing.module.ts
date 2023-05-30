import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeScreenComponent } from './employee-screen/employee-screen.component';
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
  path: '',
  component: EmployeeScreenComponent,
  children:[
    { path: 'raise-newrequest', loadChildren: () => import('./employee-screen/raise-newrequest/raise-request.module').then(m => m.RaiseRequestModule) }
  ]
},

  { path: 'edit-request', loadChildren: () => import('./employee-screen/edit-request/edit-request.module').then(m => m.EditRequestModule) },

  { path: 'employee-history', loadChildren: () => import('./employee-screen/employee-history/employee-history.module').then(m => m.EmployeeHistoryModule) },

  { path: 'feedback', loadChildren: () => import('./employee-screen/feedback/feedback.module').then(m => m.FeedbackModule) }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
