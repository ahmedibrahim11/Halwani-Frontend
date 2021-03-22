import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { MainCategoriesComponent } from './main-categories/main-categories.component';

@NgModule({
  declarations: [UserLayoutComponent, MainCategoriesComponent],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule, 
    RouterModule
  ],exports: [SharedModule]
})
export class UserModule { }
