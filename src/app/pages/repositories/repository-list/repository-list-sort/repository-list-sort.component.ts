import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { RepositorySortItem } from '@albert/enums/repository-sort-item';
import { SortDirection } from '@albert/enums/sort-direction';
import { EnumService } from '@albert/services/enum.service';
import { LocalService } from '@albert/services/local.service';
import { FormBuilder } from '@angular/forms';
import { ISortItem } from '@albert/interfaces/ISortItem';

@Component({
  selector: 'app-repository-list-sort',
  templateUrl: './repository-list-sort.component.html',
  styleUrls: ['./repository-list-sort.component.scss'],
})
export class RepositoryListSortComponent implements OnInit {
  sortForm = this.formBuilder.group({
    sort: [RepositorySortItem.NAME],
    direction: [SortDirection.ASC]
  });

  sortItems: ISortItem[] = [];
  sortDirections: ISortItem[] = [];

  constructor(
    private enumService: EnumService,
    private localService: LocalService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setSortItems();
  }

  setSortItems() {
    this.setSort();
    this.sortItems = this.enumService.getSortItems();
    this.sortDirections = this.enumService.getSortDirections();
  }

  setSort(){
    this.localService.setRepositorySort(this.sortForm.value.sort, this.sortForm.value.direction);
  }
}
