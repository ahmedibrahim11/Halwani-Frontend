import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingdataService {
  constructor() {}

  private data: any = undefined;

  setData(data: any) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }
}