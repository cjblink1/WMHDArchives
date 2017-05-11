import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Constants } from "../models/constants";
import { User } from "../models/user";
import { Subject } from "rxjs/Subject";

declare const gapi: any;

@Injectable()
export class AuthService {

  static userChangedSource = new Subject<User>();
  userChanged$ = AuthService.userChangedSource.asObservable();

  constructor(private http: Http) { 
    console.log("AuthService created.");
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '35773705526-4rbi73014dnca9pc7e367ndugdha99fa.apps.googleusercontent.com',
        scope: 'profile email',
        cookiepolicy: 'single_host_origin'
      });

      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 180,
        'height': 36,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSignIn,
        'onfailure': this.onFailure
      });
    });
  }

  public getUser(): Promise<User> {
    return new Promise(resolve => resolve(Constants.USER));
  }

  private onSignIn(googleUser) {
    console.log("User signedIn");
    AuthService.userChangedSource.next(AuthService.parseUser(googleUser));
    //this.loginUser(googleUser.getAuthResponse().id_token);
  }

  

  private static parseUser(googleUser) : User {
    const profile = googleUser.getBasicProfile();
    console.log(googleUser.getAuthResponse().id_token);
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

  private onFailure() {
    console.log("Failure");
  }

  public signOut() {
    console.log("Signed Out");
    gapi.auth2.getAuthInstance().disconnect();
    gapi.auth2.getAuthInstance().signOut();
  }
}
