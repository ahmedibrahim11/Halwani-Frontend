
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
import { HomeComponent } from './home/home.component';
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
import { TicketCreationService} from "./services/ticket-creation.service"


@NgModule({
  declarations: [ 
  
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    MainCardBodyComponent,
    NoMoreTicketsComponent,
    AllTableComponentComponent,
    CreateTicketPopupComponent,
    FiltermodalComponent,],
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
    NgxFileDropModule
  ],exports: [MatIconModule, MatFormFieldModule, MatInputModule],
  providers: [TicketCreationService],
})
export class ITpersonalModule { }
