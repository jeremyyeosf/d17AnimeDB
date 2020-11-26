import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { LottieModule } from 'ngx-lottie'
import player from 'lottie-web'

export function playerFactory() {
  return player
}

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SearchlistComponent } from './searchlist/searchlist.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimeDatabase } from './anime.database';


const ROUTES: Routes = [
  {path: '', component: MainComponent},
  {path: 'searchlist', component: SearchlistComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:genre/:q', component: ResultComponent},
  {path:'**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchlistComponent,
    SearchComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUETS),
    LottieModule.forRoot({player: playerFactory}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AnimeDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
