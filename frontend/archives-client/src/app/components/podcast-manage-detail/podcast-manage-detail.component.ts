import { Component, OnInit } from '@angular/core';

import { Episode } from '../../models/episode';

import { PodcastService } from '../../services/podcast.service';
import { EpisodeService } from '../../services/episode.service';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-podcast-manage-detail',
  templateUrl: './podcast-manage-detail.component.html',
  styleUrls: ['./podcast-manage-detail.component.css']
})
export class PodcastManageDetailComponent implements OnInit {

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
      this.podcastService.getPodcast(this.podcast_id)
                            .subscribe(podcast => {
                                this.name = podcast.name;
                                this.description = podcast.description;
                            }, error => console.log(error));
      // Request episodes
      this.episodeService.getEpisodesOfPodcast(this.podcast_id)
                            .subscribe(episodes => this.episodes = episodes,
                                error => console.log(error));
    });
  }

  private save() {
    this.podcastService.updatePodcast(this.podcast_id, this.name, this.description, () => {
      this.router.navigate(['/manage/podcasts']);
    });
  }

}
