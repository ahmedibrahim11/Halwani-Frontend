import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ITpersonalModule  } from "../ITPersonal/itpersonal.module";
import { LoginComponent } from "./login/login.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { ITPersinalLayoutComponent } from './itpersinal-layout/itpersinal-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ITPersinalLayoutComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    AppRoutingModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    ITpersonalModule,FormsModule,ReactiveFormsModule,
     

  ],

  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
