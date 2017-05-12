import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Constants } from "../models/constants";
import { User } from "../models/user";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { GoogleAuthService } from "../services/google-auth.service";

declare const gapi: any;

@Injectable()
export class AuthService {

  private userChangedSource: Subject<User>;
  userChanged$: Observable<User>;
  user: User;

  constructor(private http: Http, private googleAuth: GoogleAuthService) { 
    this.userChangedSource = new Subject<User>();
    this.userChanged$ = this.userChangedSource.asObservable();
    this.googleAuth.googleAuthInit(this.onSignIn, this.onFailure); 
    console.log("AuthService created.");
  }

  public getUser(): Promise<User> {
    return new Promise(resolve => resolve(this.user));
  }

  private onSignIn = googleUser => {
    console.log("User signedIn", this);
    this.loginUser(googleUser.getAuthResponse().id_token);
    this.user = this.parseUser(googleUser);
    this.userChangedSource.next(this.user);
    //this.loginUser(googleUser.getAuthResponse().id_token);
  }

  private loginUser(id_token: string) {
    console.log("Logging in user");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(Constants.BASE_URL+"/user/login", JSON.stringify({
      'id_token': id_token
    }), options).map(this.extractData)
      .catch(this.handleError).subscribe();
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

  private parseUser(googleUser) : User {
    const profile = googleUser.getBasicProfile();
    return {
      'id': profile.getId(),
      'firstName': profile.getGivenName(),
      'lastName': profile.getFamilyName(),
      'profilePicURL': profile.getImageUrl(),
      'email': profile.getEmail(),
      'signedIn': googleUser.isSignedIn(),
      'id_token': googleUser.getAuthResponse().id_token
    };
  }

  private onFailure = () => {
    console.log("Failure");
  }

  public signOut() {
    this.googleAuth.signOut();
  }
}
