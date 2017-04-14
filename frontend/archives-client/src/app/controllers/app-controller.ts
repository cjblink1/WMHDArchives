import { Podcast } from "../models/podcast";

export class AppController {

    podcastList: Podcast[];
    currentPodcast: Podcast;
    constructor () {
        this.podcastList = [];
        this.initializePodcasts();
        this.setRandomCurrentPodcast();
    }

    initializePodcasts() {
        this.podcastList.push(new Podcast(1, "Dank Meme Radio", "AAA"));
        this.podcastList.push(new Podcast(2, "Midnight Lunch", "BBB"));
        this.podcastList.push(new Podcast(3, "DJ Starting From Scratch", "CCC"));
        this.podcastList.push(new Podcast(4, "DJ Spinbad", "DDD"));
        this.podcastList.push(new Podcast(5, "Road Rage", "EEE"));
        this.podcastList.push(new Podcast(6, "Hot and Fluffy", "FFF"));
    }

    setRandomCurrentPodcast() {
        var randomIndex = Math.floor(Math.random()*this.podcastList.length);
        this.currentPodcast = this.podcastList[randomIndex];
    }
}
