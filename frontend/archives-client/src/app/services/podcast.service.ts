import { Injectable } from '@angular/core';
import { Podcast } from '../models/podcast'

@Injectable()
export class PodcastService {

  constructor() { }

  public getPodcasts(): Podcast[] {
    return [new Podcast(1, 'Dank Meme Radio', 'Serving up the dankest #1 jams worldwide!'),
            new Podcast(2, 'Midnight Lunch', 'It\'s lunch... except it\'s at midnight.'),
            new Podcast(3, 'PFC Tunes', 'Songs about power factor correction.'),
            new Podcast(4, 'Songify the DMV', 'Connor and Jake sing the Tennessee Driver\s Manual.')];
  }

}
