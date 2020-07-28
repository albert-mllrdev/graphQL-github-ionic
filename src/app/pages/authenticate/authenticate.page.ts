import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '@albert/services/authenticate.service';
import { environment } from '@albert/environments/environment';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticateService: AuthenticateService) { }

  ngOnInit() {
    this.authenticate();
  }

  authenticate() {
    const code = this.route.snapshot.queryParams.code;
    this.authenticateService.authenticate(code).subscribe((result: any) => {
      if (!result.access_token){
        this.router.navigate(['/login']);
      } else {
        environment.GITHUB_AUTH_TOKEN = result.access_token;
        this.router.navigate(['/users']);
      }
    });
  }
}
