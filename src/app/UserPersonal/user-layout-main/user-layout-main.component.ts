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
    var result= Object.keys(localStorage);
    result.forEach(element => {
     debugger;
       if(element.toLowerCase().indexOf("idtoken")!=-1){
        this.userData=JSON.parse(localStorage.getItem(element));
        console.log(" Resuultt",this.userData);
        let tokenDecoded = jwtDecode(this.userData['secret']);
        console.log('decoded',tokenDecoded)
        this.userEmail= tokenDecoded['preferred_username'];
       }
       else{
       }
     });
    this.http.POST(`Authentication/Login`, {
      userName: this.userEmail,
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
