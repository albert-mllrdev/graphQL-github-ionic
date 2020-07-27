import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgPipesModule } from 'ngx-pipes';

import { UsersPageRoutingModule } from './users-routing.module';
import { UsersPage } from './users.page';

import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list/user-list-item/user-list-item.component';
import { ListInfiniteScrollComponent } from '@albert/shared/list-infinite-scroll/list-infinite-scroll.component';
import { UserListSkeletonComponent } from './user-list/user-list-skeleton/user-list-skeleton.component';
import { UserListSortComponent } from './user-list/user-list-sort/user-list-sort.component';
import { UserListSearchComponent } from './user-list/user-list-search/user-list-search.component';
import { ShortNumberPipe } from 'src/app/pipes/short-number.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UsersPageRoutingModule,
    NgPipesModule
  ],
  declarations: [
    UsersPage,
    UserListComponent,
    UserListItemComponent,
    UserListSkeletonComponent,
    UserListSortComponent,
    UserListSearchComponent,
    ListInfiniteScrollComponent,
    ShortNumberPipe
  ]
})
export class UsersPageModule {}
