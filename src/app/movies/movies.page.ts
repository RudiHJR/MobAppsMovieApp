import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: [],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton]
})
export class MoviesPage implements OnInit {

    keyword:string = ""; //stores keyword the user searched for
    apiKey= "9a441077651a243fce67c40cc4c5bf8d" //personal API key, hardcoded
    movieInfo: any; //stores list of movies found from searching keywork
    options: HttpOptions = { //search for movies using keyword concatenating the basic url + api key
    url:"https://api.themoviedb.org/3/search/movie?query="
  }

  constructor(private ds:DataService, private mhs: MyHttpService, private router: Router) { }

  ngOnInit() { //ngOnInit to run once first time the page loads
    this.getKW(); //reads stored keyword and pulls matching result from TMDB
  }
    async getKW() {//reads and loads keyword saved from home page
      this.keyword = await this.ds.get('kw');
      this.options.url = this.options.url + this.keyword + "&api_key=" + this.apiKey; //concat the search url + API key
      let result = await this.mhs.get(this.options) //sends request and wait
      this.movieInfo = result.data.results //store array of movies from the TMDB response
  }

async openDetailsPage(movie: any) {//saves selected movie into storage and navogates to movie details page
  await this.ds.set('selectedMovie', movie);
  this.router.navigate(['/movie-details'])
}

async openFavourites() {//allows navigation to favourites page
  this.router.navigate(['/favourites']);
}

async addToFavourites(movie: any) {// method to add a movie to favourites, copy-exact for all pages
  let favourites = await this.ds.get('favourites') || [];
  favourites.push(movie);
  await this.ds.set('favourites', favourites);
}

async openHome() {//method to return to home page when clicking on the button
  this.router.navigate(['/home']);
 }

 sortLowestScoreFirst() {//extra method to organize movies by score, from 0 to 10, launched by a button in the html page
  this.movieInfo.sort((a: any, b:any) => a.vote_average - b.vote_average);
 }

 sortHighestScoreFirst() {//extra method to organize movies by score, from 10 to 0, launched by a button in the html page
  this.movieInfo.sort((a: any, b:any) => b.vote_average - a.vote_average);
 }
}