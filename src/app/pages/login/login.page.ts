import { Component, OnInit } from '@angular/core';

import { environment } from '@albert/environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hasAPIKeys = false;
  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
    this.checkPresentKeys();
  }

  checkPresentKeys(){
    this.hasAPIKeys = (environment.GITHUB_CLIENT_ID?.length > 0 && environment.GITHUB_REDIRECT_URI?.length > 0);
  }

  logIn() {
    const url = `${environment.GITHUB_AUTH_URI}?client_id=${environment.GITHUB_CLIENT_ID}&scope=user&redirect_uri=${environment.GITHUB_REDIRECT_URI}`;
    if (!environment.production) {
      window.open(url, '_self');
    }
    else {
      // window.open(url, '_system');
      this.iab.create(url);
    }
  }
}
