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

  favourites: any[] = []; //stores list of favourite movies in an array

  constructor(private ds: DataService, private router:Router) { }

  //ionWillEnter mandatory to refresh the page at every re-entry to show recent addition or deletions
  async ionViewWillEnter() {//loads favourite list stored
    this.favourites = await this.ds.get('favourites') || []; //if the list is still empty, an empty page will be displayed, empty array
  }

  async removeFromFavourites(movie: any) {//removes favourite from storage
    let newFavourites =[]; //creating an empty array to store the new list
    for (let i = 0; i < this.favourites.length; i++) {//loops through all movies in the favourite list
      if (this.favourites[i].id !== movie.id) {//if the favourite id does not match the id to remove, keep it in the list
        newFavourites.push(this.favourites[i]);// push list of remaining movies into the new array, excluding the deleted id
      }
    }
    
    this.favourites = newFavourites; //replaces the old list with the new array of favourites
    await this.ds.set('favourites', this.favourites); //saves updated list into storage
    }

    async openHome() {//return home option
      this.router.navigate(['/home']);
     }
     async openDetailsPage(movie:any) {//saves selected movie details and redirects user to the movie detaila page
      await this.ds.set('selectedMovie', movie);
      this.router.navigate(['/movie-details']);
     }
}
