import { Component, OnInit, Input } from '@angular/core';
import { ILanguage } from '@albert/interfaces/ILanguage';

@Component({
  selector: 'app-repository-list-item-languages',
  templateUrl: './repository-list-item-languages.component.html',
  styleUrls: ['./repository-list-item-languages.component.scss'],
})
export class RepositoryListItemLanguagesComponent implements OnInit {
  @Input() languages: ILanguage[] = [];

  constructor() { }

  ngOnInit() { }
}
