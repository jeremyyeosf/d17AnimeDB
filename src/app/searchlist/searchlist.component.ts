import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeDatabase } from '../anime.database';
import { Genre, SearchOption } from '../models';

@Component({
  selector: 'app-searchlist',
  templateUrl: './searchlist.component.html',
  styleUrls: ['./searchlist.component.css']
})
export class SearchlistComponent implements OnInit {

  searches: SearchOption[] = []
  constructor(private router: Router, private animeDB: AnimeDatabase) { }

  ngOnInit(): void {
    this.animeDB.getSearchOptions()
      .then(result => {
        this.searches = result.map(s => {
          // @ts-ignore
          s.genre = s.genre == 0? 'anime': 'manga' 
          return s
        })
      })
  }
  navigateSearch() {
    this.router.navigate(['search'])
  }
}
