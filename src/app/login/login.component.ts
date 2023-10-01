import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { UserLoginDTO } from "../core/DTOs/userLoginDTO";
import { filter, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTPMainServiceService } from '../core/services/httpmain-service.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isIframe = false;
  loginDisplay = false;
  showSpinner = false;
  private readonly _destroying$ = new Subject<void>();
  UserViewInfoObject: UserLoginDTO = new UserLoginDTO();
  UserViewInfoFormGroup: FormGroup;


  constructor(
    private http: HTTPMainServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.UserViewInfoFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    // this.isIframe = window !== window.parent && !window.opener;

    // this.msalBroadcastService.inProgress$
    //   .pipe(
    //     filter((status: InteractionStatus) => status === InteractionStatus.None),
    //     takeUntil(this._destroying$)
    //   )
    //   .subscribe(() => {
    //     this.setLoginDisplay();
    //   });
  }
  // setLoginDisplay() {
  //   this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  // }
  login() {
    debugger;
      this.http
      .POST(`Authentication/Login`, {
        userName: this.UserViewInfoFormGroup.controls['email'].value,
        password: '1111',
      })
      .subscribe(
        (data) => {
          debugger;
          console.log('data', data);
          debugger;
          localStorage.setItem('userData', JSON.stringify(data));
          localStorage.setItem('role', data['userProfile']['roleEnum']);
          debugger;
          switch (data.userProfile.roleEnum) {
            case 2:
              this.router.navigate(['/itmanager']);
              break;
            case 1:
              this.router.navigate(['/itpersonal']);
              break;
            case 3:
              this.router.navigate(['/user']);
              break;

            case 4:
              this.router.navigate(['/superadmin/settings']);
              break;
          }
        },
        (err: HttpErrorResponse) => {
          this.router.navigate(['unauthorized']);
        }
      );
  }


 
  logout() {
  }

  ngOnDestroy(): void {
  }
}
