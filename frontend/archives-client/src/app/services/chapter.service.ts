import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AuthService } from './auth.service';
import { Constants } from '../models/constants';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ChapterService {

  constructor(private authService: AuthService,
              private http: Http) { }

  public getChaptersOfEpisode(e_id: number, callback) {
    this.http.get(Constants.BASE_URL+"/chapter/episode/"+e_id)
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(result => callback(result));
  }

  public createChapter(new_time: string, title: string, e_id: number, callback) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.authService.getUser(user => {
      this.http.post(Constants.BASE_URL+"/chapter/",
      JSON.stringify({'id_token': user.id_token, 'new_time': new_time, 'title': title, 'e_id': e_id}),
      options)
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe(result => callback(result));
    }); 
  }

  public deleteChapter(chap_id: number, callback) {
    this.authService.getUser(user => {
      this.http.delete(Constants.BASE_URL+"/chapter/"+chap_id+"/auth/"+user.id_token)
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

}
