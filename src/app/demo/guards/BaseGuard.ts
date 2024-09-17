import { Injectable, NgZone } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    RouterEvent,
} from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class BaseGuard implements CanActivate {
    constructor(private router: Router, private zone: NgZone) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!localStorage.getItem('access_string')) {
            /* this.zone.run(() => {
                this.router.navigate(['/login'], {
                    queryParams: {
                        return: state.url,
                    },
                });
            }); */
            //return false;
            return true;
        } else {
            // authorised so return true
            return true;
        }
    }
}
