import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.component.html',
  styleUrls: ['./element-details.component.scss']
})
export class ElementDetailsComponent implements OnInit {

  constructor(private _http: HttpService, private router: Router) {}
  details;

  ngOnInit() {
    let url = this.router.url;
    url = url.substring(10);
    this.getDetails(url);
  }

  getDetails(element) {
    this._http
      .getElementByName(element)
      .subscribe(data => {
        this.details = data;
        console.log(this.details);
      });
  }
}
