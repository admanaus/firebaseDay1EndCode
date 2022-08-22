import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable, map, catchError, throwError } from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactRef: AngularFirestoreDocument<Contact>;
  private contactsRef: AngularFirestoreCollection<Contact>;

  constructor(private db: AngularFirestore) {
    this.contactRef = this.db.doc<Contact>('contacts/-your document id-');
    this.contactsRef = this.db.collection<Contact>('contacts');
  }

  getContactObservable(id: string): Observable<Contact> {
    return this.db.doc<Contact>(`contacts/${id}`).valueChanges()
    .pipe(                          // <-- new
      catchError(this.errorHandler) // <-- new
    );                              // <-- new;
  }

  getContactsObservable(): Observable<Contact[]> {
    return this.contactsRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Contact>[]): Contact[] => {
          return items.map((item: DocumentChangeAction<Contact>): Contact => {
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

  saveContact(contact: Contact) {
    return this.contactsRef.add(contact)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  editContact(id: string, contact: Contact) {
    return this.contactsRef.doc(id).update(contact)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteContact(id: string) {
    return this.contactsRef.doc(id).delete()
      .then(_ => console.log('Success on delete'))
      .catch(error => console.log('delete', error));
  }

  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }

}

