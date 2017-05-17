import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Podcast } from '../models/podcast';
import { Constants } from '../models/constants';


@Injectable()
export class PodcastService {

  constructor(private http: Http, 
              private authService: AuthService,
              private userService: UserService) { }

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

  public deletePodcast(p_id: number, callback) {
    this.authService.getUser(user => {
      this.http.delete(Constants.BASE_URL+"/podcast/p_id/"
                      +p_id+"/auth/"+user.id_token)
                      .map(this.extractData)
                      .catch(this.handleError)
                      .subscribe(result => callback());
    });
  }

   public createPodcast(name: string, description: string, callback) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.authService.getUser(user =>{
        this.http.post(Constants.BASE_URL+"/podcast/",
        JSON.stringify({'name': name, 'description': description, 'id_token': user.id_token}), 
        options).subscribe(result => callback());
      });
   }

   public updatePodcast(p_id: number, name: string, description: string, callback) {
     console.log(p_id);
     let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.authService.getUser(user => {
        this.http.put(Constants.BASE_URL+"/podcast/",
        JSON.stringify({'p_id': p_id, 'name': name, 'description': description, 'id_token': user.id_token}), 
        options).subscribe(result => callback());
      });
   }

  public getPodcastsOfUser(callback) {
    this.userService.getUser(userResult => userResult.subscribe(users => {
      this.authService.getUser(user => {
        this.http.get(Constants.BASE_URL+"/podcast/creator/"+users[0].user_id
                    +"/auth/"+user.id_token)
              .map(this.extractData)
              .catch(this.handleError)
              .subscribe(podcastsResult => callback(podcastsResult));
      });
    }));
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
