import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../services/login.service';
import { NavigateService } from '../services/navigate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private navigateService: NavigateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.loginService.isLogged()) {
      console.log('AuthGuard');
      this.navigateService.goLogin();
      return false;
    }
    return true;
  }
}
