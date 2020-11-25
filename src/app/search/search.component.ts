import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { AnimeDatabase, normaliseSearchText } from '../anime.database';
import { Genre, SearchOption } from '../models'
import { ResultService } from '../result.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  genre = 'anime'
  form: FormGroup
  result

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, 
    private http: HttpClient, private animeDB: AnimeDatabase, private resultService: ResultService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      q: this.fb.control('', [Validators.required])
    })
  
  }

  setGenre(g: string) {
    this.genre = g
    console.log('genre: ', this.genre)
  }

  
  async performSearch() {
    // http get query
    this.result = await this.http.get(`https://api.jikan.moe/v3/search/${this.genre}?q=${this.form.value.q}`)
      .toPromise()

    console.log('query: ', this.form.value.q)
    console.log('searchresults: ', this.result)
    
    const q = normaliseSearchText(this.form.get('q').value)
    this.resultService.add(this.result.results)
    this.router.navigate(['search', this.genre, q])
  }

  async saveSearch() {
    // get the Search object and save it into DB
    const opt: SearchOption = {
      // gets q form control
      q: this.form.get('q').value,
      // if statement setting enum
      genre: this.genre == 'anime'? Genre.Anime: Genre.Manga
    }
    await this.animeDB.saveSearchOption(opt)
    this.performSearch()
  }



}
