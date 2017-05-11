import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  private users: any[];

  constructor(private userService: UserService,
              private authService: AuthService,
              private zone: NgZone) { }

  ngOnInit() {

    this.userService.getUsers(observable => {
      observable.subscribe(users => {
        this.zone.run(() => {
          this.users = users;
        }); 
      });
    }); 
    
  }

}
