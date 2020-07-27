import { Component, OnInit } from '@angular/core';

import { environment } from '@albert/environments/environment';

@Component({
  selector: 'app-repository-list-skeleton',
  templateUrl: './repository-list-skeleton.component.html',
  styleUrls: ['./repository-list-skeleton.component.scss'],
})
export class RepositoryListSkeletonComponent implements OnInit {
  skeletons  = new Array(environment.RECORD_FETCH_COUNT);

  constructor() { }

  ngOnInit() {}

}
