import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http.service';
import { DataService } from '../services/data.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-cast-details',
  templateUrl: './cast-details.page.html',
  styleUrls: [],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCardTitle, IonCardSubtitle, IonCard, IonCardHeader, IonCardContent]
})
export class CastDetailsPage {

  cast: any; //stores all personal details from selected cast member
  otherMovies: any; //pulls and stores list of all movies this actor has appeared
  apiKey = "9a441077651a243fce67c40cc4c5bf8d" //api key hardcorded

  constructor(private ds: DataService, private mhs: MyHttpService, private router: Router) { }

  //had to use ViewWillEnter instead ngOnInit because the page was only loading once, this was fixed to get fresh data everytime the page is acessed instead
  async ionViewWillEnter() {
    let selectedCast = await this.ds.get('selectedCast'); //loads cast member saved from movie details page
    let castOptions: HttpOptions = { //concats url to search for cast details from TMBD database
      url: "https://api.themoviedb.org/3/person/" + selectedCast.id + "?api_key=" + this.apiKey
    };
  
    let castResult = await this.mhs.get(castOptions); //sends request and wait
    this.cast = castResult.data; //stores all personal information from each cast member

    let creditsOptions: HttpOptions = { //concats url to search for other movies this cast has appeared also
      url: "https://api.themoviedb.org/3/person/" + selectedCast.id + "/movie_credits?api_key=" + this.apiKey
    };
    let creditsResult = await this.mhs.get(creditsOptions); //sends request and waits
    this.otherMovies = creditsResult.data.cast; //stores list of movies the cast appeared
    }

    async openHome() {//route to home
      this.router.navigate(['/home']);
    }
    async openFavourites() { //route to favourites
      this.router.navigate(['/favourites']);
    }
    async openDetailsPage() { //route to return to details page
      this.router.navigate(['/movie-details']);
  }
}

