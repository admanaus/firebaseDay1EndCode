import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';

const routes: Routes = [
  { path: 'company/edit', component: CompanyEditComponent },
  { path: '**', redirectTo: 'company/edit' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
