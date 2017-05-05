import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Podcast } from '../../models/podcast';
import { Episode } from '../../models/episode';
import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.css']
})
export class PodcastDetailComponent implements OnInit {

  podcast_id: number;
  podcast: Podcast;
  episodes: Episode[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private episodeService: EpisodeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.podcast_id = params['id'];
      // Request podcast info
      // Request episodes
      this.episodeService.getEpisodes()
                            .subscribe(episodes => this.episodes = episodes,
                                error => console.log(error));
    });
    
  }
}
