import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Podcast } from '../../models/podcast';
import { Episode } from '../../models/episode';
import { EpisodeService } from '../../services/episode.service';
import { PodcastService } from '../../services/podcast.service';
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
      this.episodeService.getEpisodesOfPodcast(this.podcast_id, result => {
        this.episodes = result.rows;
        console.log(result);
      });

      this.authService.getUserState(user => {
        console.log("user state", user);
        if (user === null) {
          this.zone.run(() => {
            this.signed_in = false;
          });
          this.authService.getUser(loggedInUser => {
            this.zone.run(() => {
              this.signed_in = true;
            });
          });
        } else {
          this.zone.run(() => {
            this.signed_in = true;
          });
        }
      });
                            
    });
  }

  private like(episode) {
    //this.episodeService.like();
  }

  private unlike(episode) {
    //this.episodeService.unlike();
  }

}
