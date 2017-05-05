import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Podcast } from '../../models/podcast';
import { Episode } from '../../models/episode';
import { EpisodeService } from '../../services/episode.service';
import { PodcastService } from '../../services/podcast.service';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.css']
})
export class PodcastDetailComponent implements OnInit {

  podcast_id: number;
  podcast_name: string;
  episodes: Episode[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private episodeService: EpisodeService,
              private podcastService: PodcastService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.podcast_id = params['id'];
      // Request podcast info
      this.podcastService.getPodcast(this.podcast_id)
                            .subscribe(podcast => this.podcast_name = podcast.name, 
                                  error => console.log(error));
      // Request episodes
      this.episodeService.getEpisodesOfPodcast(this.podcast_id)
                            .subscribe(episodes => this.episodes = episodes,
                                error => console.log(error));
    });

    

    }

  onEpisodeSelected(episode) {
    console.log(episode.title);
    this.episodeService.createNewEpisode();
  }
}
