import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HTTPMainServiceService {

  constructor(private httpClient: HttpClient) { }
   GET(route) {
    return this.httpClient.get<any>(environment.serverURL+route);
  }
   POST(route,body) {
    return this.httpClient.post<any>(environment.serverURL+route,body);
  }
}
