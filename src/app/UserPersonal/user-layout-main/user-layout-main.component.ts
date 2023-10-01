import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
@Component({
  selector: 'app-user-layout-main',
  templateUrl: './user-layout-main.component.html',
  styleUrls: ['./user-layout-main.component.css']
})
export class UserLayoutMainComponent implements OnInit {
  loginDisplay = false;
  userData:any;
  userEmail='';
  constructor(
     private router: Router
     ) { }

  ngOnInit(): void {
   
  }

}
