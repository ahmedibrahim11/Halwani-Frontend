
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainCardBodyComponent } from './main-card-body/main-card-body.component';
import { NoMoreTicketsComponent } from './no-more-tickets/no-more-tickets.component';
import { AllTableComponentComponent } from './all-table-component/all-table-component.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { CreateTicketPopupComponent } from './create-ticket-popup/create-ticket-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FiltermodalComponent } from './filtermodal/filtermodal.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgxFileDropModule } from 'ngx-file-drop';
import { TicketCreationService} from "./services/ticket-creation.service";
import { TicketDetailsMainComponent } from './ticket-details-main/ticket-details-main.component'
import { RouterModule } from '@angular/router';
import { MessageFormatComponent } from './ticket-details-main/message-format/message-format.component';
import { NgxEditorModule } from 'ngx-editor';
import { AddedMessageComponent } from './ticket-details-main/added-message/added-message.component';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [ 
  
    NavbarComponent,
    SidebarComponent,

    MainCardBodyComponent,
    NoMoreTicketsComponent,
    AllTableComponentComponent,
    CreateTicketPopupComponent,
    FiltermodalComponent,
    TicketDetailsMainComponent,
    MessageFormatComponent,
    AddedMessageComponent,],
  imports: [
     BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatGridListModule,
    MatInputModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatFileUploadModule,
    MatRadioModule,
    NgxFileDropModule,RouterModule,NgxEditorModule,MatMenuModule
  ],exports: [MatIconModule, MatFormFieldModule, MatInputModule,NavbarComponent,
     SidebarComponent],
  providers: [TicketCreationService],
})
export class ITpersonalModule { }
