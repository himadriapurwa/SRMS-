import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRequestComponent } from './edit-request.component';

const routes: Routes = [{ path: '', component: EditRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRequestRoutingModule { }
