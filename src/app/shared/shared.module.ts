import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngalurMaterialModule } from '../angalur-material/angalur-material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SettingsMainTabsComponent } from './settings-main-tabs/settings-main-tabs.component';
import { ProfileSettingsComponent } from './settings-main-tabs/profile-settings/profile-settings.component';
import { HelpCenterConfigComponent } from './settings-main-tabs/help-center-config/help-center-config.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    SettingsMainTabsComponent,
    ProfileSettingsComponent,
    HelpCenterConfigComponent,
    UserMenuComponent,
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
