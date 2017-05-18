import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Constants } from '../models/constants';
import { User } from '../models/user';

import { AuthService } from './auth.service'; 

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private currentUser: User;

  constructor(private http: Http, 
              private authService: AuthService) {
                this.authService.userChanged$.subscribe(user => {
                       this.currentUser = user    
                });
  }

  public getUsers(callback) {
    if (!this.currentUser || !this.currentUser.signedIn) {
      this.authService.userChanged$.subscribe(user => {
        callback(this.getUsersHttpRequest(user.id_token));
      });
    } else {
      callback(this.getUsersHttpRequest(this.currentUser.id_token));
    }
  }

  public getUser(callback) {
    if (!this.currentUser || !this.currentUser.signedIn) {
      this.authService.userChanged$.subscribe(user => {
        callback(this.getUserHttpRequest(user.id_token));
      });
    } else {
      callback(this.getUserHttpRequest(this.currentUser.id_token));
    }
  }

  public setAdminStatus(u_id: number, status: boolean, callback) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.authService.getUser(user => {
      this.http.post(Constants.BASE_URL+"/user/set-admin", 
      JSON.stringify({'id_token': user.id_token, 'u_id': u_id, 'admin': status}), options)
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe(result => callback(result));
    });
  }

  public setCreatorStatus(u_id: number, status: boolean, callback) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.authService.getUser(user => {
      this.http.post(Constants.BASE_URL+"/user/set-creator", 
      JSON.stringify({'id_token': user.id_token, 'u_id': u_id, 'is_creator': status}), options)
          .map(this.extractData)
          .catch(this.handleError)
          .subscribe(result => callback(result));
    });
  }

  public getNonContributors(p_id: number, callback) {
    this.authService.getUser(user =>{
      this.http.get(Constants.BASE_URL+'/user/creators/non-contributors/podcast/'+
                      p_id +'/auth/'+ user.id_token)
                      .map(this.extractData)
                      .catch(this.handleError)
                      .subscribe(result => callback(result));
    });
  }

  public getAllContributors(p_id: number, callback) {
    this.http.get(Constants.BASE_URL+"/user/creators/contributors/podcast/"+p_id)
          .map(this.extractData)
          .catch(this.handleError)
          .subscribe(result => callback(result));
  }

  public addContributor(p_id: number, c_id:number, callback) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.authService.getUser(user => {
      this.http.post(Constants.BASE_URL+"/user/creators/contributor",
      JSON.stringify({'id_token': user.id_token, 'p_id': p_id, 'c_id': c_id}), options)
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe(result => callback(result));
    });
  }

  public removeContributor(p_id: number, c_id: number, callback) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.authService.getUser(user => {
      this.http.put(Constants.BASE_URL+"/user/creators/remove-contributor",
      JSON.stringify({'id_token': user.id_token, 'p_id': p_id, 'u_id': c_id}), options)
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe(result => callback(result));
    });
  }

  public like(e_id: number, callback) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.authService.getUser(user => {
      this.http.post(Constants.BASE_URL+"/user/like",
      JSON.stringify({'id_token': user.id_token, 'e_id': e_id}), options)
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe(result => callback(result));
    });
  }

  public unlike(e_id: number, callback) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.authService.getUser(user => {
      this.http.post(Constants.BASE_URL+"/user/unlike",
      JSON.stringify({'id_token': user.id_token, 'e_id': e_id}), options)
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe(result => callback(result));
    });
  }

  public searchUsers(searchString: string, callback) {
    this.authService.getUser(user => {
      this.http.get(Constants.BASE_URL+"/user/search/"+searchString+"/auth/"+user.id_token)
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe(result => callback(result));
    });
  }

  private getUsersHttpRequest(id_token: string): Observable<any[]> {
    return this.http.get(Constants.BASE_URL+"/user/all/auth/"+id_token)
                .map(this.extractData)
                .catch(this.handleError);
  }

  private getUserHttpRequest(id_token: string): Observable<any[]> {
    return this.http.get(Constants.BASE_URL+"/user/single/auth/"+id_token)
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


}
