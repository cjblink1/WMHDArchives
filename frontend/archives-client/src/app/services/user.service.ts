import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
                this.authService.userChanged$.subscribe(user => this.currentUser = user);
  }

  public getUsers(): Observable<any[]> {
    // if not signed in...
    if (!this.currentUser || !this.currentUser.signedIn) {
      return new Observable<any[]>(observer => {});
    }
    return this.http.get(Constants.BASE_URL+"/user/auth/"+this.currentUser.id_token)
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
