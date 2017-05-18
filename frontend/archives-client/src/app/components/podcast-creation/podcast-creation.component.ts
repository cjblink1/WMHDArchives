import { Component, OnInit, NgZone } from '@angular/core';

import { PodcastService } from '../../services/podcast.service';

import { Podcast } from '../../models/podcast';

@Component({
  selector: 'app-podcast-creation',
  templateUrl: './podcast-creation.component.html',
  styleUrls: ['./podcast-creation.component.css']
})
export class PodcastCreationComponent implements OnInit {

  private podcasts: Podcast[];

  constructor(private podcastService: PodcastService, private zone: NgZone) { }

  ngOnInit() {
    this.podcastService.getMyPodcasts(result => {
      this.zone.run(() => {
        this.podcasts = result.rows;
      });
    });
  }
}
