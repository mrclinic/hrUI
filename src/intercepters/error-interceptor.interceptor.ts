import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { UserActions } from 'src/app/demo/stateManagement/userManagment/actions/user.action';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.store.dispatch(new UserActions.logOut());
        }
        if (err.status === 403) {
          this.store.dispatch(new UserActions.logOut());
        }
        const error = err.error || err.statusText;
        return throwError(error);
      }))
  }
}
