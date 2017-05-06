import { Component, OnInit, Output, Input, EventEmitter, NgZone } from '@angular/core';
import { Podcast } from "../../models/podcast";
import { User } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { Constants } from "../../models/constants";
import { Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() currentPodcast: Podcast;
  @Output() onCurrentPodcastClick = new EventEmitter();
  user: User = new User();
  signedIn: boolean;

  constructor(private authService: AuthService, 
              private zone: NgZone) { 
    authService.userChanged$.subscribe(user => {
      zone.run(() => {
        this.user = user;
        this.signedIn = user.signedIn;
      });
    });
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut();
    this.user = Constants.USER;
    this.signedIn = false;
  }

}
