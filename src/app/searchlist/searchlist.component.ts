import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeDatabase } from '../anime.database';
import { Genre, SearchOption } from '../models';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-searchlist',
  templateUrl: './searchlist.component.html',
  styleUrls: ['./searchlist.component.css']
})
export class SearchlistComponent implements OnInit {
  result
  searches: SearchOption[] = []
  constructor(private router: Router, private animeDB: AnimeDatabase, private http: HttpClient, private resultService: ResultService) { }

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

  async performSearch(genre, q: string) {
    this.result = await this.http.get(`https://api.jikan.moe/v3/search/${genre}?q=${q}`)
      .toPromise()
    console.log('query: ', genre, '+', q)
    console.log('searchresults: ', this.result.results)
    this.resultService.add(this.result.results)
    this.router.navigate(['search', genre, q])
    
  }
}
