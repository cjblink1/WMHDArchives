import { Component, OnInit, Output, Input, EventEmitter, NgZone, ElementRef } from '@angular/core';
import { Podcast } from "../../models/podcast";
import { User } from "../../models/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() currentPodcast: Podcast;
  @Output() onCurrentPodcastClick = new EventEmitter();
  user: User;

  constructor() { 
  }

  ngOnInit() {
  }

  currentPodcastClick() {
    this.onCurrentPodcastClick.emit("Clicked podcast ${currentPodcast.name}");
    console.log(`Clicked podcast ${this.currentPodcast.name}`);
  }



  setUser(user: User){
      this.user = user;
      console.log(this.user);
  }

}
