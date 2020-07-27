import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgPipesModule } from 'ngx-pipes';

import { RepositoriesPageRoutingModule } from './repositories-routing.module';
import { RepositoriesPage } from './repositories.page';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { ListInfiniteScrollComponent } from '@albert/shared/list-infinite-scroll/list-infinite-scroll.component';
import { RepositoryListItemComponent } from './repository-list/repository-list-item/repository-list-item.component';
import { RepositoryListItemLanguagesComponent } from './repository-list/repository-list-item/repository-list-item-languages/repository-list-item-languages.component';
import { RepositoryListSkeletonComponent } from './repository-list/repository-list-skeleton/repository-list-skeleton.component';
import { RepositoryListSortComponent } from './repository-list/repository-list-sort/repository-list-sort.component';
import { RepositoryHeaderCountComponent } from './repository-header-count/repository-header-count.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RepositoriesPageRoutingModule,
    NgPipesModule
  ],
  declarations: [
    RepositoriesPage,
    RepositoryListComponent,
    RepositoryListItemComponent,
    RepositoryListItemLanguagesComponent,
    RepositoryListSkeletonComponent,
    ListInfiniteScrollComponent,
    RepositoryListSortComponent,
    RepositoryHeaderCountComponent
  ]
})
export class RepositoriesPageModule {}
