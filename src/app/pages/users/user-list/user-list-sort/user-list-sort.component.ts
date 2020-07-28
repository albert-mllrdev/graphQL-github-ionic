import { Component, OnInit } from '@angular/core';

import { EnumService } from '@albert/services/enum.service';
import { LocalService } from '@albert/services/local.service';
import { FormControl } from '@angular/forms';
import { ISortItem } from '@albert/core/interfaces/ISortItem';
import { UserSortItem } from '@albert/core/enums/user-sort-item';

@Component({
  selector: 'app-user-list-sort',
  templateUrl: './user-list-sort.component.html',
  styleUrls: ['./user-list-sort.component.scss'],
})
export class UserListSortComponent implements OnInit {
  sortControl = new FormControl(UserSortItem.JOINED_ASC);
  sortItems: ISortItem[] = [];

  constructor(
    private enumService: EnumService,
    private localService: LocalService) { }

  ngOnInit() {
    this.setSortItems();
  }

  setSortItems() {
    this.setSort();
    this.sortItems = this.enumService.getUserSortItems();
  }

  setSort() {
    this.localService.setUserSort(this.sortControl.value);
  }
}
