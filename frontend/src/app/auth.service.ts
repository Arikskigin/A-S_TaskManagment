import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  flag: boolean;

  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient,
    ) { }

  login(email: string, password: string) {
    this.flag =false;
   return this.webService.login(email, password).pipe(
      
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        
      if (res.status === 200) {
          // we have logged in successfully
          this.router.navigate(['/lists']);
        if(email=="arik30000@gmail.com")
        {
        const string="Welcome Admin";
        alert(string);
        }
        else{
        const string ="Welcome User: " +email;
        alert(string);
           }
       
        }
       
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, email, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        
       
      
        
      })
    )
    
 }


  signup(email: string, name: string, password: string) {
    return this.webService.signup(email, password, name).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, email, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        
      })
    )
  }



  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
    
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    
    return localStorage.getItem('user-id');
    
  }
  getUserEmail() {
    
    return localStorage.getItem('user-email');
    
  }
 

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }
  
  private setSession(userId: string, userEmail: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('user-email', userEmail);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
    
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-email');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }
}