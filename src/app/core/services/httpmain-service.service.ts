import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HTTPMainServiceService {
  constructor(private httpClient: HttpClient) {}
  GET(route) {
    return this.httpClient.get<any>(environment.serverURL + route, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('userData')).token
        }`,
      },
    });
  }
  POST(route, body) {
    console.log(localStorage.getItem('userData'));
    if (localStorage.getItem('userData') !== null) {
      return this.httpClient.post<any>(environment.serverURL + route, body, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userData')).token
          }`,
        },
      });
    } else {
      return this.httpClient.post<any>(environment.serverURL + route, body);
    }
  }
  PUT(route, body) {
    console.log(localStorage.getItem('userData'));
    if (localStorage.getItem('userData') !== null) {
      return this.httpClient.put<any>(environment.serverURL + route, body, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userData')).token
          }`,
        },
      });
    } else {
      return this.httpClient.put<any>(environment.serverURL + route, body);
    }
  }
}
