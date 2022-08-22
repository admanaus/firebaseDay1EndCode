import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyListComponent } from './company/company-list/company-list.component';

const routes: Routes = [
  { path: 'company/all', component: CompanyListComponent },
  { path: 'company/:id', component: CompanyEditComponent },
  { path: '**', redirectTo: 'company/all' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
