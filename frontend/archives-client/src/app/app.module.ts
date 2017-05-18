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
import { ChapterService } from './services/chapter.service';
import { UserService } from './services/user.service';
import { PodcastDeckComponent } from './components/podcast-deck/podcast-deck.component';
import { PodcastCardComponent } from './components/podcast-card/podcast-card.component';
import { PodcastDetailComponent } from './components/podcast-detail/podcast-detail.component';
import { ManagementViewComponent } from './components/management-view/management-view.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { PodcastManagementComponent } from './components/podcast-management/podcast-management.component';
import { EpisodeManagementComponent } from './components/episode-management/episode-management.component';
import { AddPodcastComponent } from './components/add-podcast/add-podcast.component';
import { PodcastManageDetailComponent } from './components/podcast-manage-detail/podcast-manage-detail.component';
import { CreationViewComponent } from './components/creation-view/creation-view.component';
import { PodcastCreationComponent } from './components/podcast-creation/podcast-creation.component';
import { PodcastCreateDetailComponent } from './components/podcast-create-detail/podcast-create-detail.component';
import { EpisodeCreationComponent } from './components/episode-creation/episode-creation.component';
import { AddEpisodeComponent } from './components/add-episode/add-episode.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { EpisodeDetailComponent } from './components/episode-detail/episode-detail.component';
import { EpisodeCreateDetailComponent } from './components/episode-create-detail/episode-create-detail.component';
import { AddChapterComponent } from './components/add-chapter/add-chapter.component';

const appRoutes: Routes = [
  { path: '', component: PodcastDeckComponent },
  { path: 'podcast/:id', component: PodcastDetailComponent },
  { path: 'episode/:id', component: EpisodeDetailComponent },
  { 
    path: 'manage', 
    component: ManagementViewComponent,
    children: [
      { path: 'users', component: UserManagementComponent },
      { path: 'podcasts', component: PodcastManagementComponent },
      { path: 'add-podcast', component: AddPodcastComponent },
      { path: 'podcast/:id', component: PodcastManageDetailComponent }
    ]
 }, 
 {
   path: 'create',
   component: CreationViewComponent,
   children: [
     { path: 'podcasts', component: PodcastCreationComponent },
     { path: 'episodes', component: EpisodeCreationComponent },
     { path: 'podcast/:id', component: PodcastCreateDetailComponent },
     { path: 'add-episode/podcast/:p_id', component: AddEpisodeComponent },
     { path: 'episode/:id', component: EpisodeCreateDetailComponent },
     { path: 'add-chapter/episode/:e_id', component: AddChapterComponent}
   ]
 },
 { 
   path: 'recommend', component: RecommendationsComponent
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
    AddPodcastComponent,
    PodcastManageDetailComponent,
    CreationViewComponent,
    PodcastCreationComponent,
    PodcastCreateDetailComponent,
    EpisodeCreationComponent,
    AddEpisodeComponent,
    RecommendationsComponent,
    EpisodeDetailComponent,
    EpisodeCreateDetailComponent,
    AddChapterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [AuthService, GoogleAuthService, PodcastService, EpisodeService, UserService, ChapterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
