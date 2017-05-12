import { Component, OnInit, Output, Input, EventEmitter, NgZone } from '@angular/core';
import { Podcast } from "../../models/podcast";
import { User } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { UserService } from '../../services/user.service';
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
              private userService: UserService,
              private zone: NgZone, 
              private router: Router) { 
    console.log("Navbar created");
    authService.userChanged$.subscribe(user => {
      zone.run(() => {
        console.log("Navbar signedIn");
        this.user = user;
      });
    });
  }

  private setAdminStatus(id_token: string) {
    this.userService.getUser(id_token).subscribe(users => {
      console.log("Got user", users[0]);
      this.signedIn = users[0].is_admin;
    });
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut();
    this.user = Constants.USER;
    this.signedIn = false;
    this.router.navigate(['/']);
  }

}
