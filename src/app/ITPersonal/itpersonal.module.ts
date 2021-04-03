import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainCardBodyComponent } from './main-card-body/main-card-body.component';
import { NoMoreTicketsComponent } from './no-more-tickets/no-more-tickets.component';
import { AllTableComponentComponent } from './all-table-component/all-table-component.component';
import { CreateTicketPopupComponent } from './create-ticket-popup/create-ticket-popup.component';
import { FiltermodalComponent } from './filtermodal/filtermodal.component';
import { TicketCreationService } from '../core/services/ticket-creation.service';
import { SharedModule } from '../shared/shared.module';
// import { AngalurMaterialModule } from '../angalur-material/angalur-material.module';
import { NgxEditorModule } from 'ngx-editor';
import { RouterModule } from '@angular/router';
import { TicketDetailsMainComponent } from './ticket-details-main/ticket-details-main.component';
import { AddedMessageComponent } from './ticket-details-main/added-message/added-message.component';
import { MessageFormatComponent } from './ticket-details-main/message-format/message-format.component';
import { ResolveTicketComponent } from './resolve-ticket/resolve-ticket.component';
import { EscalateTicketComponent } from './escalate-ticket/escalate-ticket.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TicketOptionsComponent } from './ticket-options/ticket-options.component';
@NgModule({
  declarations: [
    HomeComponent,
    MainCardBodyComponent,
    NoMoreTicketsComponent,
    AllTableComponentComponent,
    CreateTicketPopupComponent,
    FiltermodalComponent,
    TicketDetailsMainComponent,
    AddedMessageComponent,
    MessageFormatComponent,
    ResolveTicketComponent,
    EscalateTicketComponent,
    TicketOptionsComponent,
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
export class ITpersonalModule {}
