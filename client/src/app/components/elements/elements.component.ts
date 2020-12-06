import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'


@Component({
  selector: 'app-element',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit{
  constructor(private _http: HttpService, ) {}

  ngOnInit() {
    this.getData();
  }
  elements; 
  
  getData() {
    this._http
      .getElements()
      .subscribe(data => {
        this.elements = data
      })    
  }    
}
