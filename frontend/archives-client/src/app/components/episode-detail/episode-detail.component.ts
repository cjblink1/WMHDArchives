import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { EpisodeService } from '../../services/episode.service';
import { ChapterService } from '../../services/chapter.service';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements OnInit {

  private episode_id: number;
  private episode_name: string;
  private chapters: any[];

  constructor(private route: ActivatedRoute,
              private episodeService: EpisodeService,
              private chapterService: ChapterService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.episode_id = params['id'];
      this.chapterService.getChaptersOfEpisode(this.episode_id, result => {
        this.chapters = result.rows;
      });
    });
  }

}
