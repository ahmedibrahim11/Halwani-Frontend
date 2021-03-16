import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketCreationService {
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
