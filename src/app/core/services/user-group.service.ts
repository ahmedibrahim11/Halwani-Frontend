import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {HTTPMainServiceService} from './httpmain-service.service'
@Injectable({
  providedIn: 'root'
})
export class UserGroupService {
   
  constructor(private http:HTTPMainServiceService) { }
   getData()
   {
     return this.http.GET(`Group/getGroup`);
   }
}
