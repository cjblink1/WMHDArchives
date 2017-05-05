import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Episode } from '../models/episode';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class EpisodeService {

  constructor(public http: Http) { }

  
  public getStaticEpisodes() :Episode[] {
    return [new Episode(1, "Yo dude", "1:00:00", "Sup", "2-2-2000", 4, 7),
            new Episode(2, "Yo dude", "1:00:00", "Sup", "2-2-2000", 4, 7),
            new Episode(3, "Yo dude", "1:00:00", "Sup", "2-2-2000", 4, 7),
            new Episode(4, "Yo dude", "1:00:00", "Sup", "2-2-2000", 4, 7),
            new Episode(5, "Yo dude", "1:00:00", "Sup", "2-2-2000", 4, 7),
            new Episode(6, "Yo dude", "1:00:00", "Sup", "2-2-2000", 4, 7),
            new Episode(7, "Yo dude", "1:00:00", "Sup", "2-2-2000", 4, 7)];
  }

}
