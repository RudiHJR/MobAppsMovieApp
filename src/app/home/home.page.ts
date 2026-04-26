import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, FormsModule, IonButton],
})
export class HomePage {

  keyword: string = ""
  trendingMovies: any;
  apiKey = "9a441077651a243fce67c40cc4c5bf8d"

  constructor(private router:Router, private ds:DataService, private mhs:MyHttpService) {}

  ngOnInit() {
    this.getTrending();
  }

  async getTrending() {
    let options: HttpOptions = {
      url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.apiKey
    };
    let result = await this.mhs.get(options);
    this.trendingMovies = result.data.results;
  }
 async openMovies() {
   await this.ds.set("kw" , this.keyword);
    this.router.navigate(['/movies'])
  }

  async openFavourites() {
    await this.ds.set("kw" , this.keyword);
     this.router.navigate(['/favourites'])
   }
   async openDetailsPage(movie:any) {
    await this.ds.set('selectedMovie', movie);
    this.router.navigate(['/movie-details']);
   }
}
