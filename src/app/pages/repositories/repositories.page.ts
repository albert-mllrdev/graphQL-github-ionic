import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { IRepository } from '@albert/interfaces/IRepository';
import { IUser } from '@albert/interfaces/IUser';
import { RepositoryService } from 'src/app/core/data/repository.service';
import { environment } from '@albert/environments/environment';
import { RepositorySortItem } from '@albert/enums/repository-sort-item';
import { SortDirection } from '@albert/enums/sort-direction';
import { LocalService } from '@albert/core/local.service';
import { UserService } from '@albert/core/data/user.service';
import { IRepositoryFetchResult } from '@albert/core/interfaces/IRepositoryFetchResult';
import { IRepositoryListParameter } from '@albert/core/interfaces/IRepositoryListParameter';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.page.html',
  styleUrls: ['./repositories.page.scss'],
})
export class RepositoriesPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  user!: IUser;
  repositories?: IRepository[] | null;
  isLoading = true;
  totalRepositories?: number | null = null;
  hasNextPage = true;

  parameters: IRepositoryListParameter = {
    login : '',
    cursor: null,
    fetch: environment.RECORD_FETCH_COUNT,
    sortBy: RepositorySortItem.NAME,
    orderBy: SortDirection.ASC
  };

  constructor(
    private route: ActivatedRoute,
    private repositoryService: RepositoryService,
    private localService: LocalService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.setUser();
  }

  setUser(){
    this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.parameters.login = params.get('login') ?? '';
      const cachedUser = this.userService.getUserFromCache(this.parameters.login);
      if (cachedUser) {
        this.user = cachedUser;
      }
      this.watchSort();
      this.initializeRepositories();
    });
  }

  initializeRepositories() {
    this.isLoading = true;
    this.repositoryService.initialize(this.parameters);
    this.repositoryService.getRepositories().subscribe((result: any) => {
      this.loadRepositories(result);
      this.isLoading = false;
    },
    error => {
      if (error.networkError.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }

  loadRepositories(result?: IRepositoryFetchResult | null) {
    if (result) {
      this.repositories = (this.repositories) ? [... this.repositories, ... result.repositories] : [... result.repositories];
      this.totalRepositories = result.totalCount;
      this.hasNextPage = result.hasNextPage;
      this.parameters.cursor = result.cursor;
      this.isLoading = false;
    }
  }

  loadMoreRepositories(event: { target: any; }) {
    this.isLoading = true;
    this.repositoryService.getMoreRepositories(this.parameters.cursor ?? '').subscribe((result: any) => {
      event.target.complete();
    });
  }

  private resetFields() {
    this.repositories = null;
    this.parameters.cursor =  null;
    this.content.scrollToTop();
    const result = this.repositoryService.updateVariables(this.parameters);
    this.loadRepositories(result);
  }

  private watchSort() {
    this.localService.getRepositorySort().subscribe(result => {
      if (this.repositories) {
        const repositorySort: any = result;
        this.parameters.sortBy = repositorySort.sort;
        this.parameters.orderBy = repositorySort.direction;
        this.resetFields();
      }
    });
  }
}
