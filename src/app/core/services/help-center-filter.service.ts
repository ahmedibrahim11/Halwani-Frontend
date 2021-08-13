import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpCenterFilterService {
private routerInfo: BehaviorSubject<boolean>;

  constructor() {
    debugger;
    this.routerInfo = new BehaviorSubject<boolean>(false);
  }

  getValue(): Observable<boolean> {
    return this.routerInfo.asObservable();
  }
  setValue(newValue): void {
    debugger;
    this.routerInfo.next(newValue);
  }
}
