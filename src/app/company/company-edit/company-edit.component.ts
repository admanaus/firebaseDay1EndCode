import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company$: Observable<Company>;

  constructor(
    private companyService: CompanyService, 
    private activatedRoute: ActivatedRoute ) {
      if (!this.isNew) {
        this.company$ = companyService.getCompanyObservable(this.id);
      } else {
        this.company$ = of({}) as Observable<Company>;
      }
  }

  ngOnInit() {}

  get id(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  get isNew(): boolean {
    return this.id === 'new';
  }

  saveCompany(company) {
    // this.companyService.saveCompany(company);
    this.companyService.saveCompany({name: company.name});
  }

  editCompany(company) {
    this.companyService.editCompany({
      name: "The Auto Company",
      phone: '123-456-7890'});
  }

  deleteCompany() {
    this.companyService.deleteCompany();
  }

}
