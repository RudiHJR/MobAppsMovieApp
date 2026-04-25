import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: [],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader]
})
export class MovieDetailsPage {

  movie: any;
  castAndCrew: any;
  apiKey = "9a441077651a243fce67c40cc4c5bf8d";

  constructor(private ds:DataService, private mhs: MyHttpService) { }

  async ionViewWillEnter() {
  this.movie = await this.ds.get('selectedMovie');
  let options: HttpOptions = {
    url: "https://api.themoviedb.org/3/movie" + this.movie.id + "/credits?api_key=" + this.apiKey
  };

  let result = await this.mhs.get(options);
  this.castAndCrew = result.data;
 }

}
