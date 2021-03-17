
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
import { TicketCreationService } from "../core/services/ticket-creation.service";
import { SharedModule } from "../shared/shared.module";
// import { AngalurMaterialModule } from '../angalur-material/angalur-material.module';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    HomeComponent,
    MainCardBodyComponent,
    NoMoreTicketsComponent,
    AllTableComponentComponent,
    CreateTicketPopupComponent,
    FiltermodalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule, 
    RouterModule
    // AngalurMaterialModule
  ], exports: [SharedModule],
  providers: [TicketCreationService],
})
export class ITpersonalModule { }
