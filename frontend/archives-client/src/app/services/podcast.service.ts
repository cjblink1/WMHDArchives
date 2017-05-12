import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Podcast } from '../models/podcast';
import { Constants } from '../models/constants';


@Injectable()
export class PodcastService {

  constructor(private http: Http) { }

  public getAllPodcasts(): Observable<Podcast[]> {
    return this.http.get(Constants.BASE_URL+'/podcast/')
          .map(this.extractData)
          .catch(this.handleError);
  }

  public getPodcast(id: number): Observable<Podcast> {
    return this.http.get(Constants.BASE_URL+'/podcast/'+id)
           .map(this.extractData)
           .catch(this.handleError);
  }

  public searchPodcast(searchString: string): Observable<any> {
    var terms = searchString.replace(/ /g, "&");
    return this.http.get(Constants.BASE_URL+"/podcast/search/"+terms)
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

  public getStaticPodcasts(): Podcast[] {
    return [new Podcast(1, 'Dank Meme Radio', 'Serving up the dankest #1 jams worldwide!'),
            new Podcast(2, 'Midnight Lunch', 'It\'s lunch... except it\'s at midnight.'),
            new Podcast(3, 'PFC Tunes', 'Songs about power factor correction.'),
            new Podcast(4, 'Songify the DMV', 'Connor and Jake sing the Tennessee Driver\s Manual.')];
  }

}
