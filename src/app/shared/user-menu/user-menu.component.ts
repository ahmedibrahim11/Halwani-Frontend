import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
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
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
     private msalBroadcastService: MsalBroadcastService,
     private http: HTTPMainServiceService,
     private router: Router
   ) {}

  userLogout() {
    localStorage.clear();
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        postLogoutRedirectUri: "http://localhost:4200/login",
        mainWindowRedirectUri: "http://localhost:4200/"
      });
    } else {
      this.authService.logoutRedirect({
        postLogoutRedirectUri: "http://localhost:4200/",
      });
    }
  }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        debugger;
        console.log(result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });

      this.setLoginDisplay();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

}
