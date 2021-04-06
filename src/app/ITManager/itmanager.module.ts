import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NoMoreTicketsComponent } from './no-more-tickets/no-more-tickets.component';
import { AllTableComponentComponent } from './all-table-component/all-table-component.component';
import { CreateTicketPopupComponent } from './create-ticket-popup/create-ticket-popup.component';
import { FiltermodalComponent } from './filtermodal/filtermodal.component';
import { TicketCreationService } from '../core/services/ticket-creation.service';
import { SharedModule } from '../shared/shared.module';
// import { AngalurMaterialModule } from '../angalur-material/angalur-material.module';
import { NgxEditorModule } from 'ngx-editor';
import { RouterModule } from '@angular/router';

import { ManagerhomeComponent } from './managerhome/managerhome.component';
import { CancelTicketComponent } from './cancel-ticket/cancel-ticket.component';
import { AssignTicketComponent } from './assign-ticket/assign-ticket.component';
import { TicketDetailsManagerComponent } from './ticket-details-manager/ticket-details-manager.component';
import { MainCardBodyManagerComponent } from './main-card-body-manager/main-card-body-manager.component';
import { FormatMessageComponent } from './ticket-details-manager/format-message/format-message.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TicketoptionsComponent } from './ticketoptions/ticketoptions.component';
import { ToastMessageComponent } from './toast-message/toast-message.component';

@NgModule({
  declarations: [
    NoMoreTicketsComponent,
    AllTableComponentComponent,
    CreateTicketPopupComponent,
    FiltermodalComponent,
    CancelTicketComponent,
    AssignTicketComponent,
    ManagerhomeComponent,
    CancelTicketComponent,
    AssignTicketComponent,
    TicketDetailsManagerComponent,
    MainCardBodyManagerComponent,
    FormatMessageComponent,
    TicketoptionsComponent,
    ToastMessageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEditorModule,
    SharedModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,

    // AngalurMaterialModule
  ],
  exports: [SharedModule],
  providers: [TicketCreationService],
})
export class ITmanagerModule {}
