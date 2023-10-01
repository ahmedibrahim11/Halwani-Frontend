import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthenticationResult, EventMessage, EventType,InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent implements OnInit {
  loginDisplay = false;
  vaules:any;
  constructor(
     private http: HTTPMainServiceService,
     private router: Router
   ) {}

  userLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  ngOnInit(): void {

  }

  setLoginDisplay() {
  }

}
