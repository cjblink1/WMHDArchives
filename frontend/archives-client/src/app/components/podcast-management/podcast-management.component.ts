import { Component, OnInit } from '@angular/core';
import { PodcastService } from '../../services/podcast.service';
import { Podcast } from '../../models/podcast';

@Component({
  selector: 'app-podcast-management',
  templateUrl: './podcast-management.component.html',
  styleUrls: ['./podcast-management.component.css']
})
export class PodcastManagementComponent implements OnInit {

  podcasts: Podcast[];

  constructor(private podcastService: PodcastService) { }

  ngOnInit() {
    this.podcastService.getAllPodcasts()
                            .subscribe(podcasts => this.podcasts = podcasts);
  }

}
