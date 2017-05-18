import { Component, OnInit, NgZone } from '@angular/core';

import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  private episodes: any[];

  constructor(private episodeService: EpisodeService,
              private zone: NgZone) { }

  ngOnInit() {
    this.episodeService.getRecommendedEpisodes(result => {
      this.zone.run(() => { 
         this.episodes = result.rows;
      });
    });
  }

}
