import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PodcastService } from '../../services/podcast.service';
import { EpisodeService } from '../../services/episode.service';

import { Episode } from '../../models/episode';

@Component({
  selector: 'app-podcast-create-detail',
  templateUrl: './podcast-create-detail.component.html',
  styleUrls: ['./podcast-create-detail.component.css']
})
export class PodcastCreateDetailComponent implements OnInit {

  private podcast_id: number;
  private name: string;
  private description: string;
  private episodes: Episode[];

  constructor(private podcastService: PodcastService,
                private episodeService: EpisodeService,
                private route: ActivatedRoute,
                private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.podcast_id = params['id'];
      // Request podcast info
      this.podcastService.getPodcast(this.podcast_id, result => {
        this.name = result.name;
        this.description = result.description;
      });
                  
      // Request episodes
      this.episodeService.getEpisodesOfPodcast(this.podcast_id, result => {
        this.episodes = result.rows;
      });
    });
  }

  private removeEpisode(episode) {
    this.episodeService.deleteEpisode(episode.e_id, result => {
      this.episodeService.getEpisodesOfPodcast(this.podcast_id, episodesResult => {
        this.episodes = episodesResult.rows;
      })
    });
  }

}
