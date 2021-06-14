import { Component, Inject } from '@angular/core';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalCustomNavigationClient,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Halwani-ITSM-Frontend';
  private router: Router;
  private location: Location;
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private http: HttpClient
  ) {
    const customNavigationClient = new MsalCustomNavigationClient(
      authService,
      this.router,
      this.location
    );
    this.authService.instance.setNavigationClient(customNavigationClient);
  }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.setLoginDisplay();

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  // loginPopup() {
  //   if (this.msalGuardConfig.authRequest) {
  //     this.authService
  //       .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
  //       .subscribe((response: AuthenticationResult) => {
  //         this.authService.instance.setActiveAccount(response.account);
  //       });
  //   } else {
  //     this.authService
  //       .loginPopup()
  //       .subscribe((response: AuthenticationResult) => {
  //         this.authService.instance.setActiveAccount(response.account);
  //       });
  //   }
  // }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(null);
    this._destroying$.complete();
  }
}
