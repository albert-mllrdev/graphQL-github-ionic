import { Component, OnInit, Input } from '@angular/core';
import { IRepository } from '@albert/interfaces/IRepository';

@Component({
  selector: 'app-repository-list-item',
  templateUrl: './repository-list-item.component.html',
  styleUrls: ['./repository-list-item.component.scss'],
})
export class RepositoryListItemComponent implements OnInit {
  @Input() repository!: IRepository;

  constructor() { }

  ngOnInit() {}

  convertToDate(date: Date){
    return new Date(date);
  }
}
