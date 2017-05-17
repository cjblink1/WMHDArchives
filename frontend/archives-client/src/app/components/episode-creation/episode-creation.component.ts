import { Component, OnInit, NgZone } from '@angular/core';

import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-episode-creation',
  templateUrl: './episode-creation.component.html',
  styleUrls: ['./episode-creation.component.css']
})
export class EpisodeCreationComponent implements OnInit {

  private episodes: any[];

  constructor(private episodeService: EpisodeService, private zone: NgZone) { }

  ngOnInit() {
    this.episodeService.getEpisodesOfUser(result => {
      this.zone.run(()=> {
         this.episodes = result.rows;
      });
    });
  }

  private removeEpisode(episode) {
    this.episodeService.deleteEpisode(episode.e_id, result => {
      this.episodeService.getEpisodesOfUser(episodesResult => {
        this.zone.run(()=> {
          this.episodes = episodesResult.rows;
        })
      })
    });
  }
}
