import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Episode } from '../models/episode';
import { Constants } from '../models/constants';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

@Injectable()
export class EpisodeService {

  constructor(private http: Http,
              private authService: AuthService) { }

  public getEpisodesOfPodcast(id: number, callback) {
    this.authService.getUserState(user =>{
      var auth = null;
      if (user) {
        auth = user.id_token;
      }
      this.http.get(Constants.BASE_URL+'/episode/p_id/'+id+"/auth/"+auth)
          .map(this.extractData)
          .catch(this.handleError)
          .subscribe(result => callback(result));
    });
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

  public createNewEpisode(title:string, description: string, p_id: number, callback) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.authService.getUser(user => {
      this.http.post(Constants.BASE_URL+"/episode", JSON.stringify({
        podcast: p_id,
        title: title,
        description: description,
        length: '1:00:00',
        date_published: '5-17-2017',
        id_token: user.id_token
      }), options)
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe(result => callback(result));
    });
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
