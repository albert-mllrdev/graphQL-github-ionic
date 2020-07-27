import { Component, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalService } from '@albert/core/local.service';

@Component({
  selector: 'app-user-list-search',
  templateUrl: './user-list-search.component.html',
  styleUrls: ['./user-list-search.component.scss'],
})
export class UserListSearchComponent implements OnInit {
  searchControl = new FormControl();

  constructor(private localService: LocalService) { }

  ngOnInit() {}

  setSearch() {
     this.searchControl.setValue(this.searchControl.value.trim());
     this.localService.setUserSearch(this.searchControl.value);
  }
}
