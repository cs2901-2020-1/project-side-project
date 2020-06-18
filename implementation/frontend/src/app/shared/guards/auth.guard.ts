import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad, Route
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad{
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route){
        let url = `/${route.path}`;
    return this.checkLogin(url);
    }

    checkLogin(url: string){
        let role = this.authService.currentUserRole();
        
        if (role == null) {
            return true;
        }

        if (!this.authService.isTokenExpired()) {
            this.router.navigate(['/dashboard']);
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: url }});
        return false;
    }
}