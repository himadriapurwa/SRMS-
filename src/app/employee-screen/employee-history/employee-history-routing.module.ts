import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeHistoryComponent } from './employee-history.component';

const routes: Routes = [{ path: '', component: EmployeeHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeHistoryRoutingModule { }
