import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { GoogleAuthService } from './services/google-auth.service';
import { PodcastService } from './services/podcast.service';
import { EpisodeService } from './services/episode.service';
import { UserService } from './services/user.service';
import { PodcastDeckComponent } from './components/podcast-deck/podcast-deck.component';
import { PodcastCardComponent } from './components/podcast-card/podcast-card.component';
import { PodcastDetailComponent } from './components/podcast-detail/podcast-detail.component';
import { ManagementViewComponent } from './components/management-view/management-view.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { PodcastManagementComponent } from './components/podcast-management/podcast-management.component';
import { EpisodeManagementComponent } from './components/episode-management/episode-management.component';
import { AddPodcastComponent } from './components/add-podcast/add-podcast.component';

const appRoutes: Routes = [
  { path: '', component: PodcastDeckComponent },
  { path: 'podcast/:id', component: PodcastDetailComponent },
  { 
    path: 'manage', 
    component: ManagementViewComponent,
    children: [
      { path: 'users', component: UserManagementComponent },
      { path: 'podcasts', component: PodcastManagementComponent },
      { path: 'episodes', component: EpisodeManagementComponent },
      { path: 'add-podcast', component: AddPodcastComponent }
    ]
 }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PodcastDeckComponent,
    PodcastCardComponent,
    PodcastDetailComponent,
    ManagementViewComponent,
    UserManagementComponent,
    PodcastManagementComponent,
    EpisodeManagementComponent,
    AddPodcastComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [AuthService, GoogleAuthService, PodcastService, EpisodeService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
