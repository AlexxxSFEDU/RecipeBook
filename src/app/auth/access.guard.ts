import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const accessGuard: CanActivateFn = () => {
  const isLoggedIn = inject(AuthService).isAuth
  if (isLoggedIn)
    return true
  return inject(Router).createUrlTree(['/login'])
};
