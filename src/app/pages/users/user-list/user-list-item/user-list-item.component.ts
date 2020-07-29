import { Component, OnInit, Input } from '@angular/core';

import { IUser } from '@albert/interfaces/IUser';
import { UserService } from '@albert/services/user.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
})
export class UserListItemComponent implements OnInit {
  @Input() user!: IUser;
  isChangingFollowStatus = false;
  constructor(private userService: UserService) { }

  ngOnInit() {}

  convertToDate(date: Date){
    return new Date(date);
  }

  follow($event: Event, user: IUser){
    $event.stopPropagation();
    if (!this.isChangingFollowStatus) {
      this.isChangingFollowStatus = true;
      this.userService.followUser(user.id).subscribe(result => {
        if (result) {
          user.viewerIsFollowing  = result.viewerIsFollowing;
        }
        this.isChangingFollowStatus = false;
      });
    }
  }

  unfollow($event: Event,  user: IUser){
    $event.stopPropagation();
    if (!this.isChangingFollowStatus) {
      this.isChangingFollowStatus = true;
      this.userService.unfollowUser(user.id).subscribe(result => {
        if (result) {
          user.viewerIsFollowing  = result.viewerIsFollowing;
        }
        this.isChangingFollowStatus = false;
      });
    }
  }
}
