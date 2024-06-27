import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, Observable, switchMap, throwError} from "rxjs";

let isRefreshing = false

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.authService.token
    if (!token) {
      return next.handle(req)
    }
    if (isRefreshing) {
      return refreshAndProceed(this.authService, req, next)
    }
    return next.handle(addToken(req, token)).pipe
    (
      catchError(err => {
        if (err.status === 401) {
          return refreshAndProceed(this.authService, req, next)
        }
        return throwError(err)
      })
    )
  }
}

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandler) => {
  if (!isRefreshing) {
    isRefreshing = true
    return authService.refreshAuthToken().pipe
    (
      switchMap((res) => {
        isRefreshing = false
        return next.handle(addToken(req, res.refreshToken));
      })
    )
  }
  return next.handle(addToken(req, authService.token!))
}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({params: new HttpParams().set('auth', token)})
}
