import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { EnumService } from '@albert/services/enum.service';
import { CacheService } from '@albert/services/cache.service';
import { ISortItem } from '@albert/interfaces/ISortItem';
import { environment } from '@albert/environments/environment';

@Component({
  selector: 'app-repository-list-sort',
  templateUrl: './repository-list-sort.component.html',
  styleUrls: ['./repository-list-sort.component.scss'],
})
export class RepositoryListSortComponent implements OnInit {
  sortForm = this.formBuilder.group({
    sort: [environment.DEFAULT_REPOSITORY_SORT],
    direction: [environment.DEFAULT_REPOSITORY_DIRECTION]
  });

  sortItems: ISortItem[] = [];
  sortDirections: ISortItem[] = [];

  constructor(
    private enumService: EnumService,
    private cacheService: CacheService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setSortItems();
  }

  setSortItems() {
    this.sortItems = this.enumService.getRepositorySortItems();
    this.sortDirections = this.enumService.getSortDirections();
  }

  setSort() {
    this.cacheService.setRepositorySort(this.sortForm.value.sort);
  }

  setSortDirection() {
    this.cacheService.setRepositorySortDirection(this.sortForm.value.direction);
  }
}
