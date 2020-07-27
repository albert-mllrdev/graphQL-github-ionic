import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

import { IUser } from '@albert/interfaces/IUser';
import { UserService } from '@albert/data/user.service';
import { LocalService } from '@albert/core/local.service';
import { Router } from '@angular/router';
import { IUserListParameter } from '@albert/core/interfaces/IUserListParameter';
import { environment } from '@albert/environments/environment';
import { UserSortItem } from '@albert/core/enums/user-sort-item';
import { IUserFetchResult } from '@albert/core/interfaces/IUserFetchResult';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  users?: IUser[] | null;
  isLoading = true;
  hasNextPage = true;

  parameters: IUserListParameter = {
    cursor: null,
    fetch: environment.RECORD_FETCH_COUNT,
    sortBy: UserSortItem.JOINED_ASC,
    searchText: ''
  };

  constructor(
    private userService: UserService,
    private localService: LocalService,
    private router: Router) { }

  ngOnInit() {
    this.watchSortSearch();
    this.initializeUsers();
  }

  initializeUsers() {
    this.isLoading = true;
    this.userService.initialize(this.parameters);
    this.userService.getUsers().subscribe((result: any) => {
      this.loadUsers(result);
      this.isLoading = false;
    },
    error => {
      if (error.networkError.status === 401){
        this.router.navigate(['/login']);
      }
    });
  }

  loadUsers(result?: IUserFetchResult | null){
    if (result) {
      this.users = (this.users) ? [... this.users, ... result.users] : [... result.users];
      this.hasNextPage = result.hasNextPage;
    }
  }

  loadMoreUsers(event: { target: any; }) {
    this.isLoading = true;
    this.userService.getMoreUsers().subscribe((result: any) => {
    event.target.complete();
    });
  }

  private resetFields() {
    this.users = null;
    this.parameters.cursor =  null;
    this.content.scrollToTop();
    const result = this.userService.updateVariables(this.parameters);
    this.loadUsers(result);
  }

  private watchSortSearch() {
    this.localService.getUserSort().subscribe(result => {
      if (this.users) {
        this.parameters.sortBy = result;
        this.resetFields();
      }
    });

    this.localService.getUserSearch().subscribe(result => {
      if (this.users) {
        this.parameters.searchText = result;
        this.resetFields();
      }
    });
  }
}
