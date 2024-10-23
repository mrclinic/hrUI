import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { UserActions } from 'src/app/demo/stateManagement/userManagment/actions/user.action';
import { ToggleHide } from 'src/app/demo/stateManagement/userManagment/actions/spinner.actions';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      finalize(() => {
        this.store.dispatch(new ToggleHide());
      }),
      catchError(err => {
        this.store.dispatch(new ToggleHide());
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
