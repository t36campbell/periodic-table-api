import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { FirestoreService } from '../../services/firestore.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private _firestore: FirestoreService, ) {}

  ngOnInit() {
    this.getData();
  }
  elements; 
  
  getData() {
    this._firestore
      .getElements()
      .subscribe(data => {
        this.elements = data
      })    
  }    
}
