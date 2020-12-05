import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Element } from './element.model'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private pt$: AngularFirestoreCollection<Element>;
  
  constructor( private db: AngularFirestore ) {
    this.pt$ = db.collection('pt', ref => ref.orderBy('id'));
  }
  getElements() { 
    return this.pt$.snapshotChanges().pipe(
      map(changes => changes.map(({ payload: { doc } }) => {
        const data = doc.data();
        const docId = doc.id
        return { docId, ...data };
      })))
  }
  getElementDetails(docId) { 
    const element$ = this.db.doc<Element>('pt/' + docId)
    return element$.snapshotChanges().pipe(
      map(changes => {
        const data = changes.payload.data();
        const docId = changes.payload.id;
        return { docId, ...data };
      }))
  }
}
