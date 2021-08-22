import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminComponent } from "./super-admin.component";
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SuperAdminComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
  ],
  exports: [SharedModule],

})
export class SuperAdminModule { }
