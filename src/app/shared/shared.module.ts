import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngalurMaterialModule } from '../angalur-material/angalur-material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AngalurMaterialModule,
    MatSidenavModule,MatListModule,RouterModule
  ],
  exports:[ 
    AngalurMaterialModule,
    NavbarComponent,
    SidebarComponent]
})
export class SharedModule { }
