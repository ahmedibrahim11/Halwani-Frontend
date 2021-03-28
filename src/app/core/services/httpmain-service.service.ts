import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HTTPMainServiceService {

  constructor(private httpClient: HttpClient) { }
   GET(route) {
    return this.httpClient.get<any>(environment.serverURL+route,{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem("userData")).token}`}});
  }
   POST(route,body) {
    return this.httpClient.post<any>(environment.serverURL+route,body,{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem("userData")).token}`}});
  }
}
