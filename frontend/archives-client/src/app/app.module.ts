import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { PodcastService } from './services/podcast.service';
import { PodcastDeckComponent } from './components/podcast-deck/podcast-deck.component';
import { PodcastCardComponent } from './components/podcast-card/podcast-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PodcastDeckComponent,
    PodcastCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, PodcastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
