import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cast-details',
  templateUrl: './cast-details.page.html',
  styleUrls: [],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class CastDetailsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

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

