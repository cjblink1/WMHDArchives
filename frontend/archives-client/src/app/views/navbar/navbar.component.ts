import { Component, OnInit, Output, Input, EventEmitter, NgZone } from '@angular/core';
import { Podcast } from "../../models/podcast";
import { SignInController } from "../../controllers/sign-in-controller";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() currentPodcast: Podcast;
  @Output() onCurrentPodcastClick = new EventEmitter();
  signInController: SignInController;

  constructor(private zone: NgZone) { 
    this.signInController = SignInController.getInstance(zone);
  }

  ngOnInit() {
  }

  currentPodcastClick() {
    this.onCurrentPodcastClick.emit("Clicked podcast ${currentPodcast.name}");
    console.log(`Clicked podcast ${this.currentPodcast.name}`);
  }

}
