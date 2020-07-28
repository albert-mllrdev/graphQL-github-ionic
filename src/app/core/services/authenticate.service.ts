import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@albert/environments/environment';
import { IAuthenticationResponse } from '@albert/interfaces/IAuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private httpClient: HttpClient) { }

  authenticate(githubCode: string): Observable<IAuthenticationResponse> {
    return this.httpClient.post<IAuthenticationResponse>('/githubAuth/login/oauth/access_token',
    {
      client_id: environment.GITHUB_CLIENT_ID,
      client_secret: environment.GITHUB_SECRET,
      code: githubCode,
      redirect_uri: environment.GITHUB_REDIRECT_URI
    },
    {
      headers: {
        Accept: 'application/json',
       'Content-Type': 'application/json',
       'Access-Control-Allow-Credentials': 'true'
      },
      withCredentials: true
    }).pipe(
      map(result => {
         return result;
      })
    );
  }
}
