import { User } from "./user";

export class Constants {
    static USER: User = {
        id: '1',
        firstName: 'Leroy',
        lastName: 'Jenkins',
        email: 'leroy@Jenkins.com',
        profilePicURL: 'https://pbs.twimg.com/profile_images/655814847213514752/PsV5ZqAA.jpg',
        signedIn: false,
        id_token: '0'
    }

    static BASE_URL: string = 'http://archives.cjblink1.pro:3000/api';
}
