import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginDTO } from '../core/DTOs/userLoginDTO';
import { HTTPMainServiceService } from '../core/services/httpmain-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedirectRequest } from '@azure/msal-browser';
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  durationInSeconds = 5;
  showSpinner: Boolean = false;
  hide = true;
  UserViewInfoObject: UserLoginDTO = new UserLoginDTO();
  UserViewInfoFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private http: HTTPMainServiceService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private msalService: MsalService
  ) {}

  ngOnInit(): void {
    this.UserViewInfoFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitLogin() {
    // console.log(this.UserViewInfoFormGroup.value);
    // this.showSpinner = true;
    // if (this.UserViewInfoFormGroup.valid) {
    //   this.http.POST(`Authentication/Login`, {
    //     userName: this.UserViewInfoFormGroup.value.email,
    //     password: this.UserViewInfoFormGroup.value.password
    //   }).subscribe((data) => {
    //     this.showSpinner = false;
    //     console.log("data", data);
    //     localStorage.setItem("userData", JSON.stringify(data))
    //     switch (data.userProfile.roleEnum) {
    //       case 0:
    //         this.router.navigate(["/itmanager"])
    //         break;
    //       case 1:
    //         this.router.navigate(["/itpersonal"])
    //         break;
    //       case 2:
    //         this.router.navigate(["/user"])
    //         break;

    //     }
    //   }, err => {
    //     this.showSpinner=false;
    //     this._snackBar.open("Username or password is incorrct", "OK", { duration: this.durationInSeconds * 1000 }); })
    //   ///navigate depending on credentials
    // }
    this.msalService.loginRedirect();
    this.msalService.instance.handleRedirectPromise().then((res) => {
      if (res != null && res.account != null) {
        this.msalService.instance.setActiveAccount(res.account);
        console.log(res.account);
      }
    });
  }
}
