import { Component, OnInit, Input } from '@angular/core';

import { IRepository } from '@albert/interfaces/IRepository';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit {
  @Input() repositories?: IRepository[];

  constructor() { }

  ngOnInit() {}
}
