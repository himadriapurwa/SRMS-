import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaiseRequestComponent } from './raise-request.component';

const routes: Routes = [{ path: '', component: RaiseRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaiseRequestRoutingModule { }
