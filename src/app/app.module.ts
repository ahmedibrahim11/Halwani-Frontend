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
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { SharedComponent } from './shared/shared.component';
import { UserModule } from '../app/UserPersonal/user.module';

@NgModule({
  declarations: [AppComponent, LoginComponent, SharedComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    ITpersonalModule,
    ITmanagerModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
  ],

  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
