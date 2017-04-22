import { Component } from '@angular/core';
import { Podcast } from "./models/podcast";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentPodcast: Podcast;
  constructor(){
  }

 
}
