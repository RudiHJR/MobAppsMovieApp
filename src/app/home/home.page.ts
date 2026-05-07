import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, FormsModule, IonButton, IonCard, IonCardHeader, IonCardTitle, CommonModule, IonCardContent, IonCardSubtitle],
})
export class HomePage implements OnInit{

  keyword: string = "" //stores keyword the user searched for
  trendingMovies: any; //stores list of trending movies from TMDB
  apiKey = "9a441077651a243fce67c40cc4c5bf8d" //personal API key, hardcoded

  constructor(private router:Router, private ds:DataService, private mhs:MyHttpService) {}

  ngOnInit() { // ngOnInit to launch when the page loads the first time
    this.getTrending();
  }

  async getTrending() { //method to pull trending movies from TMDB using API key
    //search for trending movies concatenating the basic url + api key
    let options: HttpOptions = {
      url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey
    };
    let result = await this.mhs.get(options); //need to send the request and wait
    this.trendingMovies = result.data.results; // stores the array of movies TMDB returned for trending
  }

 async openMovies() {  //openMovies() method launches when search button is clicked
    if (this.keyword == '') return; //as per assignment instruction, if the user clicks an empty search bar it should show the trending movies, so it does nothing
    await this.ds.set("kw" , this.keyword); //saves the keyword for the movies page to read
    this.router.navigate(['/movies']) //navigates to the movies page once search is completed
  }
  async addToFavourites(movie: any) {//method to add a movie to the favourites list
    let favourites = await this.ds.get('favourites') || []; // loads existing favourites list from storage, or starts a new empty array
    favourites.push(movie); //adds the chosen movie to the favourites
    await this.ds.set('favourites', favourites); //saves the list including the update into storage
  }
  async openFavourites() {//navigates to the favourites page when clicked on the button
     this.router.navigate(['/favourites'])
   }
   async openDetailsPage(movie:any) { //when clicked "+Details", saves the selected movie to storage and then navigates to details page
    await this.ds.set('selectedMovie', movie); //saves movie details for the details page to open
    this.router.navigate(['/movie-details']); //sends user to the movie.details page
   }
}
