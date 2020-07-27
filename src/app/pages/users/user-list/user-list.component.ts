import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from '@albert/interfaces/IUser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users?: IUser[];
  @Input() showSkeleton = false;

  constructor(private route: Router) { }

  ngOnInit() {}

  viewUserRepositories(userLogin: string){
    this.route.navigate([`/repositories/${userLogin}`]);
  }
}
