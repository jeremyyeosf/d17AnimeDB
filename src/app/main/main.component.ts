import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem} from 'lottie-web'
import { AnimationOptions} from 'ngx-lottie'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/spirit.json'
  }
  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

  navigateSearchList() {
    this.router.navigate(['searchlist'])
  
  }
}
