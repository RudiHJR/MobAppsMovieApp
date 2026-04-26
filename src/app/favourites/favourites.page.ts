import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: [],
  standalone: true,
  imports: [IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonButton, IonContent]
})
export class FavouritesPage {

  favourites: any[] = [];

  constructor(private ds: DataService, private router:Router) { }

  async ionViewWillEnter() {
    this.favourites = await this.ds.get('favourites') || []; 
  }

  async removeFromFavourites(movie: any) {
    this.favourites = this.favourites.filter((m: any) => m.id !== movie.id);
    await this.ds.set('favourites', this.favourites);
    }
    async openHome() {
      this.router.navigate(['/home']);
     }
}
