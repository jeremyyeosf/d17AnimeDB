import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  genre = ''
  q = ''
  resultsDisplay
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private resultService: ResultService) { }

  ngOnInit(): void {
    this.genre = this.activatedRoute.snapshot.params['genre']
    this.q = this.activatedRoute.snapshot.params['q']
    console.log('FINALresults: ',this.resultService.results[0])
    this.resultsDisplay = this.resultService.results[0]
  }

}
