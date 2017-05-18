import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Podcast } from '../../models/podcast';
import { Episode } from '../../models/episode';
import { EpisodeService } from '../../services/episode.service';
import { PodcastService } from '../../services/podcast.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.css']
})
export class PodcastDetailComponent implements OnInit {

  podcast_id: number;
  podcast_name: string;
  episodes: Episode[];
  private signed_in: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private episodeService: EpisodeService,
              private podcastService: PodcastService,
              private userService: UserService,
              private authService: AuthService,
              private zone: NgZone) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.podcast_id = params['id'];
      // Request podcast info
      this.podcastService.getPodcast(this.podcast_id, result => {
        this.podcast_name = result.name;
      });
                            
      // Request episodes

      this.authService.getUserState(user => {
        if (user == null) {
          this.zone.run(() => {
            this.signed_in = false;
            this.episodeService.getEpisodesOfPodcast(this.podcast_id, result => {
              this.episodes = result.rows;
            });
          });
          this.authService.getUser(loggedInUser => {
            this.zone.run(() => {
              this.signed_in = true;
              this.episodeService.getEpisodesOfPodcast(this.podcast_id, result => {
                this.episodes = result.rows;
              });
            });
          });
        } else {
          this.zone.run(() => {
            this.signed_in = true;  
            this.episodeService.getEpisodesOfPodcast(this.podcast_id, result => {
              this.episodes = result.rows;
            });
          });
        }
      });          
    });
  }

  private like(episode) {
    this.userService.like(episode.e_id, result => {
      this.episodeService.getEpisodesOfPodcast(this.podcast_id, result => {
        this.episodes = result.rows;
      });
    });
  }

  private unlike(episode) {
    this.userService.unlike(episode.e_id, result => {
      this.episodeService.getEpisodesOfPodcast(this.podcast_id, result => {
        this.episodes = result.rows;
      });
    });
  }

}
