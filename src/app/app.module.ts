import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ITpersonalModule } from '../app/ITPersonal/itpersonal.module';
import { ITmanagerModule } from '../app/ITManager/itmanager.module';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { SharedComponent } from './shared/shared.component';
import { UserModule } from '../app/UserPersonal/user.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';
import { HomeComponent } from './home/home.component';
import { SuperAdminModule } from './super-admin/super-admin.module';

// const isIE =
//   window.navigator.userAgent.indexOf('MSIE ') > -1 ||
//   window.navigator.userAgent.indexOf('Trident/') > -1;


// export function MSALInstanceFactory(): IPublicClientApplication {
//   debugger;
//   return new PublicClientApplication({
//     auth: {
//       clientId: '35c2f7e6-ed49-45d9-9f12-f5373e0df0ca',
//       authority:
//         'https://login.microsoftonline.com/1213517f-fdb5-4592-9934-471910b55de2',
//       redirectUri: 'https://halwani-frontend-live.azurewebsites.net/',
//       postLogoutRedirectUri: 'https://halwani-frontend-live.azurewebsites.net/',
//     },
//     cache: {
//       cacheLocation: BrowserCacheLocation.LocalStorage,
//       storeAuthStateInCookie: isIE, // set to true for IE 11
//     },
//     system: {
//       loggerOptions: {
//         loggerCallback,
//         logLevel: LogLevel.Info,
//         piiLoggingEnabled: false,
//       },
//     },
//   });
// }

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map<string, Array<string>>();
//   protectedResourceMap.set('Enter_the_Graph_Endpoint_Herev1.0/me', [
//     'user.read',
//   ]);

//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap,
//   };
// }

// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return {
//     interactionType: InteractionType.Redirect,
//     authRequest: {
//       scopes: ['user.read'],
//     },
//   };
// }

@NgModule({
  declarations: [AppComponent, LoginComponent, SharedComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    ITpersonalModule,
    ITmanagerModule,
    SuperAdminModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    MatSnackBarModule
  ],

  exports: [],
  providers: [
    // {
    //   provide: MSAL_INSTANCE,
    //   useFactory: MSALInstanceFactory,
    // },
    // {
    //   provide: MSAL_GUARD_CONFIG,
    //   useFactory: MSALGuardConfigFactory,
    // },
    // {
    //   provide: MSAL_INTERCEPTOR_CONFIG,
    //   useFactory: MSALInterceptorConfigFactory,
    // },
    // MsalService,
    // MsalGuard,
    // MsalBroadcastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
