import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerFlagService {
  private routerInfo: BehaviorSubject<boolean>;

  constructor() {
    debugger;
    this.routerInfo = new BehaviorSubject<boolean>(false);
  }

  getSpinnerValue(): Observable<boolean> {
    return this.routerInfo.asObservable();
  }
  setSpinnerValue(newValue): void {
    this.routerInfo.next(newValue);
  }
}
