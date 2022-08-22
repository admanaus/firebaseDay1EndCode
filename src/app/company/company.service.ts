import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Observable, map } from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyRef: AngularFirestoreDocument<Company>;
  private companiesRef: AngularFirestoreCollection<Company>;

  constructor(private db: AngularFirestore) {
    this.companyRef = this.db.doc<Company>('companies/-your document id-');
    this.companiesRef = this.db.collection<Company>('companies');
  }

  getCompanyObservable(): Observable<Company | undefined> {
    return this.companyRef.valueChanges();
  }

  getCompaniesObservable(): Observable<Company[]> {
    return this.companiesRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Company>[]): Company[] => {
          return items.map((item: DocumentChangeAction<Company>): Company => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        })
      );
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

