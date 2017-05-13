import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PodcastService } from '../../services/podcast.service';

@Component({
  selector: 'app-add-podcast',
  templateUrl: './add-podcast.component.html',
  styleUrls: ['./add-podcast.component.css']
})
export class AddPodcastComponent implements OnInit {

  private name: string;
  private description: string;

  constructor(private podcastService: PodcastService, private router: Router) { }

  ngOnInit() {
  }

  private submit() {
    this.podcastService.createPodcast(this.name, this.description, () =>{
      this.router.navigate(['/manage/podcasts']);
    });
  }

}
