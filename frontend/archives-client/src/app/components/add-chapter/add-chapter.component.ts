import { Component, OnInit } from '@angular/core';

import { ChapterService } from '../../services/chapter.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.css']
})
export class AddChapterComponent implements OnInit {

  private title: string;
  private episode_id: number;

  constructor(private chapterService: ChapterService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.episode_id = params['e_id'];
    });
  }

  private submit() {
    this.chapterService.createChapter('00:01:00', this.title, this.episode_id, result => {
      this.router.navigate(['/create/episode', this.episode_id]);
    });
  }

}
