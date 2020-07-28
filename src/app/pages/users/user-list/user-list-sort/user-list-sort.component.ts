import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { EnumService } from '@albert/services/enum.service';
import { CacheService } from '@albert/services/cache.service';
import { ISortItem } from '@albert/interfaces/ISortItem';
import { environment } from '@albert/environments/environment';

@Component({
  selector: 'app-user-list-sort',
  templateUrl: './user-list-sort.component.html',
  styleUrls: ['./user-list-sort.component.scss'],
})
export class UserListSortComponent implements OnInit {
  sortControl = new FormControl(environment.DEFAULT_USER_SORT);
  sortItems: ISortItem[] = [];

  constructor(
    private enumService: EnumService,
    private cacheService: CacheService) { }

  ngOnInit() {
    this.setSortItems();
  }

  setSortItems() {
    this.sortItems = this.enumService.getUserSortItems();
  }

  setSort() {
     this.cacheService.setUserSort(this.sortControl.value);
  }
}
