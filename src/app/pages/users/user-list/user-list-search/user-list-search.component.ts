import { Component, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CacheService } from '@albert/services/cache.service';

@Component({
  selector: 'app-user-list-search',
  templateUrl: './user-list-search.component.html',
  styleUrls: ['./user-list-search.component.scss'],
})
export class UserListSearchComponent implements OnInit {
  searchControl = new FormControl();

  constructor(private cacheService: CacheService) { }

  ngOnInit() {}

  setSearch() {
     this.searchControl.setValue(this.searchControl.value.trim());
     this.cacheService.setUserSearch(this.searchControl.value);
  }
}
