import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { IRepository } from '@albert/interfaces/IRepository';
import { RepositoryService } from '@albert/services/repository.service';
import { environment } from '@albert/environments/environment';
import { CacheService } from '@albert/core/services/cache.service';
import { UserService } from '@albert/services/user.service';
import { IRepositoryFetchResult } from '@albert/core/interfaces/IRepositoryFetchResult';
import { IRepositoryListParameter } from '@albert/core/interfaces/IRepositoryListParameter';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.page.html',
  styleUrls: ['./repositories.page.scss'],
})
export class RepositoriesPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  userAvatarURL?: string | null;
  repositories?: IRepository[] | null;
  isLoading = true;
  totalRepositories?: number | null = null;
  hasNextPage = true;

  parameters: IRepositoryListParameter = {
    login : '',
    cursor: null,
    fetch: environment.RECORD_FETCH_COUNT,
    sortBy: environment.DEFAULT_REPOSITORY_SORT,
    orderBy: environment.DEFAULT_REPOSITORY_DIRECTION
  };

  constructor(
    private route: ActivatedRoute,
    private repositoryService: RepositoryService,
    private cacheService: CacheService,
    private router: Router) { }

  ngOnInit() {
    this.setUser();
  }

  setUser(){
    this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.parameters.login = params.get('login') ?? '';

      this.cacheService.getUserAvatar(this.parameters.login).subscribe(result => {
        if (result) {
          this.userAvatarURL = result;
        }
      });

      this.watchSort();
      this.initializeRepositories();
    });
  }

  initializeRepositories() {
    this.isLoading = true;
    this.repositoryService.initialize(this.parameters);
    this.repositoryService.getRepositories().subscribe((result: IRepositoryFetchResult | null) => {
      this.loadRepositories(result);
      this.isLoading = false;
    },
    error => {
      if (error.networkError && error.networkError.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }

  loadRepositories(result: IRepositoryFetchResult | null) {
    if (result) {
      this.repositories = [...result.repositories];
      this.totalRepositories = result.totalCount;
      this.hasNextPage = result.hasNextPage;
      this.parameters.cursor = result.cursor;
      this.isLoading = false;
    }
  }

  loadMoreRepositories(event: { target: any; }) {
    this.isLoading = true;
    this.repositoryService.getMoreRepositories(this.parameters.cursor).subscribe(() => {
      event.target.complete();
    });
  }

  private resetFields() {
    this.repositories = null;
    this.parameters.cursor =  null;
    this.content.scrollToTop();
    this.isLoading = true;
    this.repositoryService.updateVariables(this.parameters).subscribe((result: IRepositoryFetchResult | null) => {
      this.loadRepositories(result);
      this.isLoading = false;
    });
  }

  private watchSort() {
    this.cacheService.getRepositorySort().subscribe(result => {
      if (this.repositories) {
        this.parameters.sortBy = result;
        this.resetFields();
      }
    });

    this.cacheService.getRepositorySortDirection().subscribe(result => {
      if (this.repositories) {
        this.parameters.orderBy = result;
        this.resetFields();
      }
    });
  }
}
