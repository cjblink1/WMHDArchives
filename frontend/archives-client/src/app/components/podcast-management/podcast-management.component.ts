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

  private searchChange(event) {
    if (event.srcElement.value === "") {
      this.podcastService.getAllPodcasts()
                            .subscribe(podcasts => this.podcasts = podcasts);
    } else {
      this.podcastService.searchPodcast(event.srcElement.value)
            .subscribe(result => this.podcasts = result.rows);
    }
  }

  private deletePodcast(podcast: Podcast) {
    this.podcastService.deletePodcast(podcast.podcast_id, () => {
      this.podcastService.getAllPodcasts()
                            .subscribe(podcasts => this.podcasts = podcasts);
    });
  }

}
