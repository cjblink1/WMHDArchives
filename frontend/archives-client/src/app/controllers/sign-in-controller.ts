import { User } from "../models/user";
import { NgZone } from "@angular/core";

declare const gapi: any;

export class SignInController {

    private static instance: SignInController;
    
    public static getInstance(zone: NgZone) {
        if (SignInController.instance) {
            SignInController.instance.zone = zone;
            return SignInController.instance;
        } else {
            SignInController.instance = new SignInController(zone);
            return SignInController.instance;
        }
    }

    user: User;
    zone: NgZone;
    private constructor (zone: NgZone) {
        this.user = new User();
        this.zone = zone;
        this.initializeAuth();
    }

    private initializeAuth() {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: '35773705526-4rbi73014dnca9pc7e367ndugdha99fa.apps.googleusercontent.com',
                scope: 'profile email'
            });
            
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.currentUser.listen((googleUser) => {
                this.zone.run(() => {
                    this.setUserParams(googleUser);
                });
            });
        });
    }

    private setUserParams(googleUser) {
        console.log("Setting user params");
        var profile = googleUser.getBasicProfile();
        this.user.id = profile.getId();
        this.user.firstName = profile.getGivenName();
        this.user.lastName = profile.getFamilyName();
        this.user.email = profile.getEmail();
        this.user.profilePicURL = profile.getImageUrl();
    }
    
}
