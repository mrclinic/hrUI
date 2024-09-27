import { Injectable, NgZone } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/demo/models/userManagment/User';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  currentUser: User = {};
  accessToken: string = '';
  constructor(private router: Router, private zone: NgZone) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      this.currentUser = JSON.parse(localStorage.getItem('users.loggedUser') || "") as User;

      if (this.currentUser.id) {
        /* if (!this.currentUser?.IsActive) {
          const link = ['activate'];
          this.zone.run(() => {
            this.router.navigate(link);
          });
          return next.handle(request);
        } */
        this.accessToken = this.currentUser.userToken;
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        return next.handle(request);
      }
      const link = ['auth/login'];
      /* this.zone.run(() => {
        this.router.navigate(link);
      }); */
    } catch (err) {
      const link = ['auth/login'];
      /* this.zone.run(() => {
        this.router.navigate(link);
      }); */
    }
    return next.handle(request);
  }
}
