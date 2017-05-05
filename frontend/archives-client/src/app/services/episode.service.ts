import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Episode } from '../models/episode';
import { Constants } from '../models/constants';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class EpisodeService {

  constructor(public http: Http) { }

  public getEpisodesOfPodcast(id: number): Observable<Episode[]> {
    return this.http.get(Constants.BASE_URL+'/episode/p_id/'+id)
          .map(this.extractData)
          .catch(this.handleError);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  
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
