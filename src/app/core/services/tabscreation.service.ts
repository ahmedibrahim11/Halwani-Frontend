import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabscreationService {
  constructor() {}
  private data: string = undefined;

  setTabValue(data: string) {
    this.data = data;
  }

  getTabValue(): string {
    return this.data;
  }
}
