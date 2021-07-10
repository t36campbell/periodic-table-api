import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';

import { Element } from '../../../services/element.model';

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.component.html',
  styleUrls: ['./element-details.component.scss']
})
export class ElementDetailsComponent implements OnInit {

  @Input() private elementId: number;

  details: Element;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit() {
    this.getDetails(this.elementId);
  }

  getDetails(id: number): void {
    this.httpService.getElementById(id).subscribe(data => this.details = data );
  }
}
