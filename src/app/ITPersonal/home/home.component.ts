import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;

  constructor(private authService: MsalService,
     private msalBroadcastService: MsalBroadcastService,
     private http: HTTPMainServiceService,
     private router: Router
     ) { }

  ngOnInit(): void {
    debugger;
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
    var local=localStorage.key(0);
    debugger;
    var userData=JSON.parse(localStorage.getItem(local))
    debugger;
    console.log("localstroage",userData);
    this.http.POST(`Authentication/Login`, {
      userName: userData['username'],
      password:"1111"
    }).subscribe((data) => {
      console.log("data", data);
      debugger
      localStorage.setItem("userData", JSON.stringify(data));
   
      debugger;
      switch (data.userProfile.roleEnum) {
        case 0:
          this.router.navigate(["/itmanager"])
          break;
        case 1:
          this.router.navigate(["/itpersonal"])
          break;
        case 2:
          this.router.navigate(["/user"])
          break;
      }
    }, err => {
    });


  }


}
