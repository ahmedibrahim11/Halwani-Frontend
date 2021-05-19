import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { MainCategoriesComponent } from './main-categories/main-categories.component';
import { GroupCategoryComponent } from './group-category/group-category.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { UserLayoutMainComponent } from './user-layout-main/user-layout-main.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { CreatTicketPopupComponent } from './creat-ticket-popup/creat-ticket-popup.component';
import { TicketsTableComponent } from './tickets-table/tickets-table.component';

@NgModule({
  declarations: [UserLayoutComponent, MainCategoriesComponent, GroupCategoryComponent, CreateTicketComponent, UserLayoutMainComponent, MyTicketsComponent, CreatTicketPopupComponent, TicketsTableComponent],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule, 
    RouterModule
  ],exports: [SharedModule]
})
export class UserModule { }
