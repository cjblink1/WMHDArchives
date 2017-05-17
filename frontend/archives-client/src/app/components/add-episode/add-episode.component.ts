import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-add-episode',
  templateUrl: './add-episode.component.html',
  styleUrls: ['./add-episode.component.css']
})
export class AddEpisodeComponent implements OnInit {

  private title: string;
  private description: string;
  private podcast_id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private episeodeService: EpisodeService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.podcast_id = params['p_id'];
    });
  }

  submit() {
    this.episeodeService.createNewEpisode(this.title, this.description, this.podcast_id, result => {
      this.router.navigate(['/create/podcast', this.podcast_id]);
    });
  }

}
