import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';

import { environment } from '@albert/environments/environment';
import { UserService } from '@albert/services/user.service';
import { CacheService } from '@albert/services/cache.service';
import { IUser } from '@albert/interfaces/IUser';
import { IUserListParameter } from '@albert/interfaces/IUserListParameter';
import { IUserFetchResult } from '@albert/interfaces/IUserFetchResult';

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
    sortBy: environment.DEFAULT_USER_SORT,
    searchText: ''
  };

  constructor(
    private userService: UserService,
    private cacheService: CacheService,
    private router: Router) { }

  ngOnInit() {
    this.watchSortSearch();
    this.initializeUsers();
  }

  initializeUsers() {
    this.isLoading = true;
    this.userService.initialize(this.parameters);
    this.userService.loadUsers().subscribe((result: IUserFetchResult | null) => {
      this.loadUsers(result);
      this.isLoading = false;
    },
    error => {
      if (error.networkError && error.networkError.status === 401){
        this.router.navigate(['/login']);
      }
    });
  }

  loadUsers(result: IUserFetchResult | null){
    if (result) {
      this.users =  [... result.users];
      this.hasNextPage = result.hasNextPage;
      this.parameters.cursor = result.cursor;
    }
  }

  loadMoreUsers(event: { target: any; }) {
    this.isLoading = true;
    this.userService.loadMoreUsers(this.parameters.cursor).subscribe(() => {
      event.target.complete();
    });
  }

  private resetFields() {
    this.users = null;
    this.parameters.cursor =  null;
    this.content.scrollToTop();
    this.isLoading = true;
    this.userService.updateVariables(this.parameters).subscribe((result: IUserFetchResult | null) => {
      this.loadUsers(result);
      this.isLoading = false;
    });
  }

  private watchSortSearch() {
    this.cacheService.getUserSort().subscribe(result => {
      if (this.users) {
        this.parameters.sortBy = result;
        this.resetFields();
      }
    });

    this.cacheService.getUserSearch().subscribe(result => {
      if (this.users) {
        this.parameters.searchText = result;
        this.resetFields();
      }
    });
  }
}
