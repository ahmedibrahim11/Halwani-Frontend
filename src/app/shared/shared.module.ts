import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngalurMaterialModule } from '../angalur-material/angalur-material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SettingsMainTabsComponent } from './settings-main-tabs/settings-main-tabs.component';
import { ProfileSettingsComponent } from './settings-main-tabs/profile-settings/profile-settings.component';
import { HelpCenterConfigComponent } from './settings-main-tabs/help-center-config/help-center-config.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserSideBarComponent } from './user-side-bar/user-side-bar.component';
import { AddSettingsComponent } from './settings-main-tabs/help-center-config/add-settings/add-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserNotificationComponent } from './user-notification/user-notification.component';
import { FiltersPopupComponent } from './settings-main-tabs/help-center-config/filters-popup/filters-popup.component';
import { SLASettingsComponent } from './settings-main-tabs/slasettings/slasettings.component';
import { CreateSLAComponent } from './settings-main-tabs/slasettings/create-sla/create-sla.component';
import { ProductCategorySettingsComponent } from './settings-main-tabs/product-category-settings/product-category-settings.component';
import { CreateProductCategoryComponent } from './settings-main-tabs/product-category-settings/create-product-category/create-product-category.component';
@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    SettingsMainTabsComponent,
    ProfileSettingsComponent,
    HelpCenterConfigComponent,
    UserMenuComponent,
    UserSideBarComponent,
    AddSettingsComponent,
    UserNotificationComponent,
    FiltersPopupComponent,
    SLASettingsComponent,
    CreateSLAComponent,
    ProductCategorySettingsComponent,
    CreateProductCategoryComponent,
  ],
  imports: [
    CommonModule,
    AngalurMaterialModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    AngalurMaterialModule,
    NavbarComponent,
    SidebarComponent,
    UserSideBarComponent,
  ],
})
export class SharedModule {}
