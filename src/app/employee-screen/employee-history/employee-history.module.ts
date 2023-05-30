import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeHistoryRoutingModule } from './employee-history-routing.module';
import { EmployeeHistoryComponent } from './employee-history.component';


@NgModule({
  declarations: [
    EmployeeHistoryComponent
  ],
  imports: [
    CommonModule,
    EmployeeHistoryRoutingModule
  ]
})
export class EmployeeHistoryModule { }
