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

  public getUser(id_token: string): Observable<any[]> {
    return this.http.get(Constants.BASE_URL+"/user/single/auth/"+id_token)
              .map(this.extractData)
              .catch(this.handleError);
  }

  public setAdminStatus(u_id: number, status: boolean, callback) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.authService.getUser().then(user => {
      console.log(`Setting user ${u_id} to be admin: ${status}, token: ${user.id_token}`);
      this.http.post(Constants.BASE_URL+"/user/set-admin", 
      JSON.stringify({'id_token': user.id_token, 'u_id': u_id, 'admin': status}), options)
        .map(this.extractData)
        .catch(this.handleError).subscribe(result => callback());
    });
  }

  private getUsersHttpRequest(id_token: string): Observable<any[]> {
    return this.http.get(Constants.BASE_URL+"/user/all/auth/"+id_token)
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
