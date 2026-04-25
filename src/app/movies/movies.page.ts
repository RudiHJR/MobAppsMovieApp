import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: [],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class MoviesPage implements OnInit {


  keyword:string = "";
  apiKey= "9a441077651a243fce67c40cc4c5bf8d"
  options: HttpOptions = {
    url:"https://api.themoviedb.org/3/search/movie?query=toy story&api_key=" + this.apiKey
  }

  constructor(private ds:DataService, private mhs: MyHttpService) { }

  ngOnInit() {
    this.getKW();
  }
    async getKW() {
    this.keyword = await this.ds.get('kw');
    this.options.url.concat(this.keyword)
    this.mhs.get(this.options)
  }

}
