import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'

import { Element } from '../../services/element.model'

@Component({
  selector: 'app-element',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit{
  
  elements: Element[]; 
  
  constructor(private _http: HttpService, ) {}
  
  ngOnInit() {
    this.getData();
  }
  
  getData() {
    this._http
      .getElements()
      .subscribe(data => {
        this.elements = data
      })    
  }    
}
