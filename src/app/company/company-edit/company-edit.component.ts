import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company$: Observable<Company>;

  constructor(private companyService: CompanyService) {
    this.company$ = this.companyService.getCompanyObservable();
  }

  ngOnInit() {}

  saveCompany(company) {
    // this.companyService.saveCompany(company);
    this.companyService.saveCompany({name: company.name});
  }

  editCompany(company) {
    this.companyService.editCompany({phone: '123-456-7890'});
  }

  deleteCompany() {
    this.companyService.deleteCompany();
  }

}
