import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http.service';
import { DataService } from '../services/data.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-cast-details',
  templateUrl: './cast-details.page.html',
  styleUrls: [],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCardTitle, IonCardSubtitle]
})
export class CastDetailsPage implements OnInit {

  cast: any;
  otherMovies: any;
  apiKey = "9a441077651a243fce67c40cc4c5bf8d"

  constructor(private ds: DataService, private mhs: MyHttpService, private router: Router) { }

  ngOnInit() {
    this.getCastDetails();
    }

    async getCastDetails() {
    let selectedCast = await this.ds.get('selectedCast');
    let castOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/person/" + selectedCast.id + "?api_key=" + this.apiKey
    };
    let castResult = await this.mhs.get(castOptions);
    this.cast = castResult.data;
    let creditsOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/person/" + selectedCast.id + "/movie_credits?api_key=" + this.apiKey
    };
    let creditsResult = await this.mhs.get(creditsOptions);
    this.otherMovies = creditsResult.data.cast;
    }

    async openHome() {
      this.router.navigate(['/home']);
    }
    async openFavourites() {
      this.router.navigate(['/favourites']);
    }
    async openDetailsPage() {
      this.router.navigate(['/movie-details']);
  }
}

