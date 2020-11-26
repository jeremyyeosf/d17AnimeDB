import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgNavigatorShareService } from 'ng-navigator-share';
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
  canShare = false

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private resultService: ResultService, private webShare: NgNavigatorShareService) { }

  ngOnInit(): void {
    this.canShare = this.webShare.canShare()
    this.genre = this.activatedRoute.snapshot.params['genre']
    this.q = this.activatedRoute.snapshot.params['q']
    console.log('FINALresults: ',this.resultService.results[0])
    this.resultsDisplay = this.resultService.results[0]
  }

  shareThis(idx: number) {
    const r = this.resultsDisplay[idx]
    this.webShare.share({
      title: r.title,
      text: r.synopsis,
      url: r.image_url
    })
    .catch(e => console.error('Webshare', e))
  }
}
