import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-element',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit{
  constructor(private _http: HttpService, ) {}

  elements;
  searchControl: FormControl;

  ngOnInit() {
    this.getData();
    this.searchControl = new FormControl();
  }

  getData() {
    this._http
      .getElements()
      .subscribe(data => {
        this.elements = data;
      });
  }
}
