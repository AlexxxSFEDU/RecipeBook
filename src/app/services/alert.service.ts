import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Alert} from "../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alert$ = new Subject<Alert>()

  constructor() {
  }

  success(text: string) {
    this.alert$.next({type: 'success', text});
  }

  danger(text: string) {
    this.alert$.next({type: 'danger', text});
  }
}
