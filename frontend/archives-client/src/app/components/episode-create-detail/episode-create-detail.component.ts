import { Component, OnInit } from '@angular/core';

import { ChapterService } from '../../services/chapter.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-episode-create-detail',
  templateUrl: './episode-create-detail.component.html',
  styleUrls: ['./episode-create-detail.component.css']
})
export class EpisodeCreateDetailComponent implements OnInit {

  private episode_id: number;
  private chapters: any[];

  constructor(private chapterService: ChapterService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.episode_id = params['id'];
       this.chapterService.getChaptersOfEpisode(this.episode_id, result => {
         this.chapters = result.rows;
       });
    });
  }

  private removeChapter(chap_id: number) {
    this.chapterService.deleteChapter(chap_id, result => {
      this.chapterService.getChaptersOfEpisode(this.episode_id, result => {
        this.chapters = result.rows;
      });
    });
  }

}
