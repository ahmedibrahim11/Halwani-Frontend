import { Component, Inject } from '@angular/core';

import {
  AuthenticationResult,
  InteractionStatus,
  InteractionType,
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
  constructor(
  ) {
  }

  ngOnInit(): void {
  
  }

  
}
