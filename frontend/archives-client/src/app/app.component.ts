import { Component } from '@angular/core';
import { AppController } from "./controllers/app-controller";
import { Podcast } from "./models/podcast";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appController: AppController;
  currentPodcast: Podcast;
  constructor(){
    this.appController = new AppController();
  }

  setRandomCurrentPodcast() {
    this.appController.setRandomCurrentPodcast();
  }
}
