import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { PodcastService } from './services/podcast.service';
import { EpisodeService } from './services/episode.service';
import { PodcastDeckComponent } from './components/podcast-deck/podcast-deck.component';
import { PodcastCardComponent } from './components/podcast-card/podcast-card.component';
import { PodcastDetailComponent } from './components/podcast-detail/podcast-detail.component';

const appRoutes: Routes = [
  { path: '', component: PodcastDeckComponent },
  { path: 'podcast/:id', component: PodcastDetailComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PodcastDeckComponent,
    PodcastCardComponent,
    PodcastDetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [AuthService, PodcastService, EpisodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
