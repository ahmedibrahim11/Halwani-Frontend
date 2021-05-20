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
import { TicketsHistoryComponent } from './tickets-history/tickets-history.component';
import { MyEsclationsComponent } from './my-esclations/my-esclations.component';
import { NoMoreTicketsComponent } from '../ITPersonal/no-more-tickets/no-more-tickets.component';
import { NomoreTicketsComponent } from './nomore-tickets/nomore-tickets.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NgxEditorModule } from 'ngx-editor';
import { MessageFormatComponent } from "./user-details/message-format/message-format.component";
import { AddedMessageComponent } from "./user-details/added-message/added-message.component";
@NgModule({
  declarations: [AddedMessageComponent,MessageFormatComponent,UserLayoutComponent, MainCategoriesComponent, GroupCategoryComponent, CreateTicketComponent, UserLayoutMainComponent, MyTicketsComponent, CreatTicketPopupComponent, TicketsTableComponent, TicketsHistoryComponent, MyEsclationsComponent, NomoreTicketsComponent, UserDetailsComponent],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule, 
    RouterModule,
    NgxEditorModule
    
  ],exports: [SharedModule]
})
export class UserModule { }
