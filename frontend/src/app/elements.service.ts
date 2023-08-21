import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  constructor() { }

  getElements() {
    return axios.get('http://localhost:3000/elements')
  }
}
