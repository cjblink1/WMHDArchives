import { Component, OnInit, Input } from '@angular/core';
import { Podcast } from '../../models/podcast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-podcast-card',
  templateUrl: './podcast-card.component.html',
  styleUrls: ['./podcast-card.component.css']
})
export class PodcastCardComponent implements OnInit {

  @Input() podcast: Podcast;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelect() {
    this.router.navigate(['/podcast', this.podcast.podcast_id]);
  }

}
