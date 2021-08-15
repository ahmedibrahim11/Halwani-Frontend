import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AskForSupportComponent } from '../ask-for-support/ask-for-support.component';
import { ReportABugComponent } from '../report-abug/report-abug.component';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType,InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  loginDisplay = false;
  role:any;
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
     private msalBroadcastService: MsalBroadcastService,
     private http: HTTPMainServiceService,
    private router: Router,public dialog: MatDialog) {}

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

   this.role=localStorage.getItem("role");
  }
  
  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }


  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );
  fromManager() {
    return window.location.href.includes('/itmanager');
  }

  userLogout() {
    localStorage.clear();
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        postLogoutRedirectUri: "https://halwani-frontend.azurewebsites.net/",
        mainWindowRedirectUri: "https://halwani-frontend.azurewebsites.net/"
      });
    } else {
      this.authService.logoutRedirect({
        postLogoutRedirectUri: "https://halwani-frontend.azurewebsites.net/",
      });
    }
  }
  reportABug()
  {
    const dialogRef = this.dialog.open(ReportABugComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  askForSupport()
  {  const dialogRef = this.dialog.open(AskForSupportComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });}
}
