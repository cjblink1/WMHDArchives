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

  podcast: Podcast;
  episodes: Episode[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private episodeService: EpisodeService) { }

  ngOnInit() {
    this.episodes = this.episodeService.getStaticEpisodes();
  }
}
