import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, FormsModule, IonButton],
})
export class HomePage {

  keyword: string = ""
  constructor(private router:Router, private ds:DataService) {}


 async openMovies() {
   await this.ds.set("kw" , this.keyword);
    this.router.navigate(['/movies'])
  }

  async openFavourites() {
    await this.ds.set("kw" , this.keyword);
     this.router.navigate(['/favourites'])
   }
}
