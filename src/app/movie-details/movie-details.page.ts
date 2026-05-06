import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: [],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonButton]
})
export class MovieDetailsPage {

  movie: any; //stores selected movie loaded from storage
  castAndCrew: any; //stores cast and crew data pulled from TMDB
  apiKey = "9a441077651a243fce67c40cc4c5bf8d"; //personal API key

  constructor(private ds:DataService, private mhs: MyHttpService, private router:Router) { }

  //had to use ViewWillEnter instead ngOnInit because the page was only loading once, this was fixed to get fresh data everytime the page is acessed instead
  async ionViewWillEnter() {
      this.getDetails();
    }

  async getDetails() {//loads selected movie from storage and pulls cast and crew from TMDB database
  this.movie = await this.ds.get('selectedMovie');//loads the saved movie, stored when user clicked a movie
  let options: HttpOptions = {url: "https://api.themoviedb.org/3/movie/" + this.movie.id + "/credits?api_key=" + this.apiKey //concats the search url for cast and crew
  };

  let result = await this.mhs.get(options); //send request and wait
  this.castAndCrew = result.data; //stores credits data containing cast array
 }

 async openCastDetails(cast: any) { //saves cast member into storage and open cast details page
  await this.ds.set('selectedCast', cast); //saves cast member to load page
  this.router.navigate(['/cast-details']) //redirects to cast details page
 }
 async addToFavourites(movie: any) {//add to favourites option, copy-exact
  let favourites = await this.ds.get('favourites') || [];
  favourites.push(movie);
  await this.ds.set('favourites', favourites);
 }

 async openFavourites() {//to open favourites page, copy-exact
   this.router.navigate(['/favourites'])
 }
 async openHome() {//to return home, copy-exact
  this.router.navigate(['/home']);
 }
}
//