import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: [],
  standalone: true,
  imports: [IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonButton]
})
export class FavouritesPage implements OnInit {

  favourites: any[] = [];

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.loadFavourites(); 
  }

  async loadFavourites() {
    this.favourites = await this.ds.get('favourites') || [];
  }

  async removeFavourite(movie: any) {
    this.favourites = this.favourites.filter((m: any) => m.id !== movie.id);
    await this.ds.set('favourites', this.favourites);
    }
}
