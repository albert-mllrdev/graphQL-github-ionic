import { Component, OnInit } from '@angular/core';

import { environment } from '@albert/environments/environment';

@Component({
  selector: 'app-user-list-skeleton',
  templateUrl: './user-list-skeleton.component.html',
  styleUrls: ['./user-list-skeleton.component.scss'],
})
export class UserListSkeletonComponent implements OnInit {
  skeletons  = new Array(environment.RECORD_FETCH_COUNT);

  constructor() { }

  ngOnInit() {}
}
