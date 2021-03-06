import { Component, OnInit } from '@angular/core';
import { PodcastService } from '../../services/podcast.service';
import { Podcast } from '../../models/podcast';

@Component({
  selector: 'app-podcast-deck',
  templateUrl: './podcast-deck.component.html',
  styleUrls: ['./podcast-deck.component.css']
})
export class PodcastDeckComponent implements OnInit {

  private podcasts: Podcast[];

  constructor(private podcastService: PodcastService) { }

  ngOnInit() {
    this.getPodcasts();
  }

  private getPodcasts() {
    this.podcastService.getAllPodcasts()
                        .subscribe(podcasts => this.podcasts = podcasts,
                                   error => console.log(error));
  }

}
