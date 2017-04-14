import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Podcast } from "../../models/podcast";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() currentPodcast: Podcast;
  @Output() onCurrentPodcastClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  currentPodcastClick() {
    this.onCurrentPodcastClick.emit("Clicked podcast ${currentPodcast.name}");
    console.log(`Clicked podcast ${this.currentPodcast.name}`);
  }

}
