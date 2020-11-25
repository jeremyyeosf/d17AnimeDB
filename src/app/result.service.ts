import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  results
  constructor() { }

  add(result) {
    this.results = []
    this.results.push(result)
  }

  clear() {
    this.results = []
  }
}
