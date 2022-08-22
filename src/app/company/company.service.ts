import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Observable, map, catchError, throwError } from 'rxjs';
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

  getCompanyObservable(id: string): Observable<Company> {
    return this.db.doc<Company>(`companies/${id}`).valueChanges()
    .pipe(                          // <-- new
      catchError(this.errorHandler) // <-- new
    );                              // <-- new;
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
        }),                           // <-- don't forget the new comma here
        catchError(this.errorHandler) // <-- new
      );
  }

  saveCompany(company: Company) {
    return this.companiesRef.add(company)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  editCompany(company: Company) {
    return this.companiesRef.doc(company.id).update(company)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteCompany(id: string) {
    return this.companiesRef.doc(id).delete()
      .then(_ => console.log('Success on delete'))
      .catch(error => console.log('delete', error));
  }

  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }

}

