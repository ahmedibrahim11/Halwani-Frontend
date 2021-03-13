import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MainCardBodyComponent } from './main-card-body/main-card-body.component';
import { NoMoreTicketsComponent } from './no-more-tickets/no-more-tickets.component';
import { AllTableComponentComponent } from './all-table-component/all-table-component.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    MainCardBodyComponent,
    NoMoreTicketsComponent,
    AllTableComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatGridListModule,
    MatInputModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,MatCheckboxModule
  ],

  exports: [MatIconModule, MatFormFieldModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
