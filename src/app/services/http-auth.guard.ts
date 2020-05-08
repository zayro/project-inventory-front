import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';

// import Services
import * as service from './jwt.service';


@Injectable()
export class AuthguardGuard implements CanActivate {

constructor(
    private jwt: service.JwtService,
    private router: Router,
  ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.jwt.isTokenExpired()) {

      console.log('​AuthguardGuard -> canActivate -> ', this.jwt.getTokenExpirationDate());
      console.log('​AuthguardGuard -> canActivate -> this.jwt.isTokenExpired', this.jwt.isTokenExpired());
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      this.router.navigate(['/login']);
      localStorage.clear();
      sessionStorage.clear();
      localStorage.removeItem('config');

      return false;
    } else {

      console.log('​AuthguardGuard -> canActivate -> ', this.jwt.getTokenExpirationDate());
      console.log('​AuthguardGuard -> canActivate -> this.jwt.isTokenExpired', this.jwt.isTokenExpired());
      return true;

    }

  }

  /*
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.user.getUserLoggedIn();
   }
  */

  //  canActivate(): boolean {
  //   if (this._authService.loggedIn()) {
  //     console.log('true')
  //     return true
  //   } else {
  //     console.log('false')
  //     this.router.navigate(['/login'])
  //     return false
  //   }
  // }

}
