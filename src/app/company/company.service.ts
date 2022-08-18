import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyRef: AngularFirestoreDocument<Company>;

  constructor(private db: AngularFirestore) {
    this.companyRef = this.db.doc<Company>('companies/-your document id-');
  }

  getCompanyObservable(): Observable<Company | undefined> {
    return this.companyRef.valueChanges();
  }

  saveCompany(company: Company) {
    this.companyRef.set(company);
  }

  editCompany(company: any) {
    this.companyRef.update(company);
  }

  deleteCompany() {
    this.companyRef.delete();
  }

}

