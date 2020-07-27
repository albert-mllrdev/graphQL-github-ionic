import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repository-header-count',
  templateUrl: './repository-header-count.component.html',
  styleUrls: ['./repository-header-count.component.scss'],
})
export class RepositoryHeaderCountComponent implements OnInit {
  @Input() count?: number;
  constructor() { }

  ngOnInit() {}

}
