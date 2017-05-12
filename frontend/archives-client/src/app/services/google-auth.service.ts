import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

declare const gapi: any;

@Injectable()
export class GoogleAuthService {

  constructor() { }

  public googleAuthInit(success, failure) {
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
        'onsuccess': success,
        'onfailure': failure
      });
    });
  }

  public signOut() {
    console.log("Signed Out");
    gapi.auth2.getAuthInstance().disconnect();
    gapi.auth2.getAuthInstance().signOut();
  }

}
