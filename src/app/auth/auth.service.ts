import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

export type AuthData =
  {
    "idToken": string,
    "email": string,
    "refreshToken": string,
    "expiresIn": string,
    "localId": string
  }


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  private signUpUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=\n" +
    "AIzaSyCH_M5nC5ntTXUFhNZqWjAhCxVeAxphmRc"
  private signInUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=\n" +
    "AIzaSyCH_M5nC5ntTXUFhNZqWjAhCxVeAxphmRc"

  constructor(private http: HttpClient, private router: Router) {
  }

  token: string | null = null
  refreshToken: string | null = null
  email: string | null = null
  cookieService = inject(CookieService);

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
      this.refreshToken = this.cookieService.get('refreshToken');
      this.email = this.cookieService.get('email');
    }
    return !!this.token
  }

  signUp(email: string, password: string): Observable<AuthData> {
    return this.http.post<AuthData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError.bind(this)));
  }

  signIn(email: string, password: string): Observable<AuthData> {
    return this.http.post<AuthData>(this.signInUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap(value => {
        this.saveTokens(value)
      }),
      catchError(this.handleError.bind(this)))
  }

  refreshAuthToken() {
    return this.http.post<AuthData>(this.signInUrl, {refreshToken: this.refreshToken}).pipe
    (tap(value => this.saveTokens(value)),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  logout() {
    this.cookieService.deleteAll()
    this.token = null
    this.refreshToken = null
    this.email = null
    this.router.navigate(['/login'])
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error
    switch (message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        this.error$.next('Неверные учётные данные. Попробуйте снова!')
        break
      case 'EMAIL_EXISTS':
        this.error$.next('Email already exists!')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Неверный формат email. Попробуйте снова!')
    }
    return throwError(error)
  }

  private saveTokens(res: AuthData) {
    this.token = res.idToken
    this.refreshToken = res.refreshToken
    this.email = res.email
    this.cookieService.set("token", this.token)
    this.cookieService.set("refreshToken", this.refreshToken)
    this.cookieService.set("email", this.email)
  }
}
