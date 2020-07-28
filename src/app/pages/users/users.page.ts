import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';

import { environment } from '@albert/environments/environment';
import { IUser } from '@albert/interfaces/IUser';
import { UserService } from '@albert/services/user.service';
import { LocalService } from '@albert/services/local.service';
import { IUserListParameter } from '@albert/core/interfaces/IUserListParameter';
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
    this.userService.loadUsers().subscribe((result: any) => {
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
      this.users =  [... result.users];
      this.hasNextPage = result.hasNextPage;
      this.parameters.cursor = result.cursor;
    }
  }

  loadMoreUsers(event: { target: any; }) {
    this.isLoading = true;
    this.userService.loadMoreUsers(this.parameters.cursor).subscribe((result: any) => {
      event.target.complete();
    });
  }

  private resetFields() {
    this.users = null;
    this.parameters.cursor =  null;
    this.content.scrollToTop();
    this.userService.updateVariables(this.parameters).subscribe((result?: IUserFetchResult | null) => {
      this.loadUsers(result);
    });
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
