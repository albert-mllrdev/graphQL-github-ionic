import { Component, OnInit, Input } from '@angular/core';

import { IUser } from '@albert/interfaces/IUser';
import { UserService } from '@albert/services/user.service';
import { User } from '@albert/core/graphQL/generated/graphql';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
})
export class UserListItemComponent implements OnInit {
  @Input() user!: IUser;

  constructor(private userService: UserService) { }

  ngOnInit() {}

  convertToDate(date: Date){
    return new Date(date);
  }

  follow($event: Event, user: IUser){
    $event.stopPropagation();
    this.userService.followUser(user.id).subscribe(result => {
      if (result) {
        user.viewerIsFollowing  = result.viewerIsFollowing;
      }
    });
  }

  unfollow($event: Event,  user: IUser){
    $event.stopPropagation();
    this.userService.unfollowUser(user.id).subscribe(result => {
      if (result) {
        user.viewerIsFollowing  = result.viewerIsFollowing;
      }
    });
  }
}
