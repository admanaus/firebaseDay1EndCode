import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company$: Observable<Company>;

  constructor(
    private companyService: CompanyService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
     ) {
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
    this.companyService.saveCompany({name: company.name})
    .then(_ => this.router.navigate(['/company/all']));;;
  }

  editCompany(company) {
    this.companyService.editCompany({
      name: "The Auto Company",
      phone: '123-456-7890'})
      .then(_ => this.router.navigate(['/company/all']));;;
  }

  deleteCompany() {
    this.companyService.deleteCompany(this.id)
    .then(_ => this.router.navigate(['/company/all']));;
  }

}
