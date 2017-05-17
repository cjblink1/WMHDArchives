import { Component, OnInit, NgZone } from '@angular/core';

import { Episode } from '../../models/episode';

import { PodcastService } from '../../services/podcast.service';
import { EpisodeService } from '../../services/episode.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-podcast-manage-detail',
  templateUrl: './podcast-manage-detail.component.html',
  styleUrls: ['./podcast-manage-detail.component.css']
})
export class PodcastManageDetailComponent implements OnInit {

  private podcast_id: number;
  private name: string;
  private description: string;
  private episodes: Episode[];
  private nonContributors = [];
  private contributors: any[];

  constructor(private podcastService: PodcastService,
              private episodeService: EpisodeService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private zone: NgZone) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.podcast_id = params['id'];
      // Request podcast info
      this.podcastService.getPodcast(this.podcast_id)
                            .subscribe(podcast => {
                                this.name = podcast.name;
                                this.description = podcast.description;
                            }, error => console.log(error));
      

      this.userService.getNonContributors(this.podcast_id, result => {
        this.zone.run(() => {
          this.nonContributors = result.rows;
        });
      });

      this.userService.getAllContributors(this.podcast_id, result => {
        this.zone.run(() => {
          this.contributors = result.rows;
        });
      });
    });
  }

  private save() {
    this.podcastService.updatePodcast(this.podcast_id, this.name, this.description, () => {
      this.router.navigate(['/manage/podcasts']);
    });
  }

  private addContributor(c_id: number) {
    this.userService.addContributor(this.podcast_id, c_id, result => {
      this.updateContributors();
    });
  }

  private updateContributors() {
    this.userService.getAllContributors(this.podcast_id, result => {
      this.zone.run(() => {
        this.contributors = result.rows;
      });
    });

    this.userService.getNonContributors(this.podcast_id, result => {
      this.zone.run(() => {
        this.nonContributors = result.rows;
      });
    });
  }
}
