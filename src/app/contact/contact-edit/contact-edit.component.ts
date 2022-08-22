import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact$: Observable<Contact>;
  companies$: Observable<Company[]>;

  constructor(
    private contactService: ContactService,
    private companyService: CompanyService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
     ) {
      if (!this.isNew) {
        this.contact$ = contactService.getContactObservable(this.id);
      } else {
        this.contact$ = of({}) as Observable<Contact>;
      }
      this.companies$ = companyService.getCompaniesObservable();
  }

  ngOnInit() {}

  get id(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  get isNew(): boolean {
    return this.id === 'new';
  }

  saveContact(contact) {
    this.contactService.saveContact({name: contact.name})
    .then(_ => this.router.navigate(['/contact/all']));;;
  }

  editContact(contact) {
    this.contactService.editContact(this.id, contact)
      .then(_ => this.router.navigate(['/contact/all']));;;
  }

  deleteContact() {
    this.contactService.deleteContact(this.id)
    .then(_ => this.router.navigate(['/contact/all']));;
  }

}
