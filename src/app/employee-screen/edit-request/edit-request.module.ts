import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRequestRoutingModule } from './edit-request-routing.module';
import { EditRequestComponent } from './edit-request.component';


@NgModule({
  declarations: [
    EditRequestComponent
  ],
  imports: [
    CommonModule,
    EditRequestRoutingModule
  ]
})
export class EditRequestModule { }
