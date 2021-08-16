import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './ITPersonal/home/home.component';
import { ManagerhomeComponent } from './ITManager/managerhome/managerhome.component';

import { MainCardBodyComponent } from './ITPersonal/main-card-body/main-card-body.component';
import { MainCardBodyManagerComponent } from './ITManager/main-card-body-manager/main-card-body-manager.component';

import { TicketDetailsMainComponent } from './ITPersonal/ticket-details-main/ticket-details-main.component';
import { TicketDetailsManagerComponent } from './ITManager/ticket-details-manager/ticket-details-manager.component';

import { LoginComponent } from './login/login.component';
import { UserLayoutComponent } from '../app/UserPersonal/user-layout/user-layout.component';
import { MainCategoriesComponent } from '../app/UserPersonal/main-categories/main-categories.component';
import { GroupCategoryComponent } from '../app/UserPersonal/group-category/group-category.component';
import { CreateTicketComponent } from '../app/UserPersonal/create-ticket/create-ticket.component';
import { ServiceRequestsComponent } from './ITManager/service-requests/service-requests.component';
import { IncidentsComponent } from './ITManager/incidents/incidents.component';
import { ProblemsComponent } from './ITManager/problems/problems.component';
import { ChangesComponent } from './ITManager/changes/changes.component';
import { PersonalServiceRequestComponent } from './ITPersonal/personal-service-request/personal-service-request.component';
import { PersonalProblemsComponent } from './ITPersonal/personal-problems/personal-problems.component';
import { PersonalIncidentsComponent } from './ITPersonal/personal-incidents/personal-incidents.component';
import { PersonalChangesComponent } from './ITPersonal/personal-changes/personal-changes.component';
import { SettingsMainTabsComponent } from './shared/settings-main-tabs/settings-main-tabs.component';
import { UserLayoutMainComponent } from './UserPersonal/user-layout-main/user-layout-main.component';
import { MyTicketsComponent } from './UserPersonal/my-tickets/my-tickets.component';
import { TicketsHistoryComponent } from './UserPersonal/tickets-history/tickets-history.component';
import { MyEsclationsComponent } from './UserPersonal/my-esclations/my-esclations.component';
import { UserDetailsComponent } from './UserPersonal/user-details/user-details.component';
import { TicketEsclationsComponent } from './ITManager/ticket-esclations/ticket-esclations.component';
import { MsalGuard } from '@azure/msal-angular';
import { SharedComponent } from './shared/shared.component';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
const routes: Routes = [
  {
    path: 'itpersonal',
    component: HomeComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path: 'esclated',
        component: TicketEsclationsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'settings',
        component: SettingsMainTabsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'changes',
        component: PersonalChangesComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'problems',
        component: PersonalProblemsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'incidents',
        component: PersonalIncidentsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'servicerequests',
        component: PersonalServiceRequestComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'details/:id',
        component: TicketDetailsMainComponent,
        canActivate: [MsalGuard],
      },
      { path: '', component: MainCardBodyComponent, canActivate: [MsalGuard] },
    ],
  },
  {
    path: 'itmanager',
    component: ManagerhomeComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path: 'esclated',
        component: TicketEsclationsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'settings',
        component: SettingsMainTabsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'changes',
        component: ChangesComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'problems',
        component: ProblemsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'incidents',
        component: IncidentsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'servicerequests',
        component: ServiceRequestsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'details/:id',
        component: TicketDetailsMainComponent,
        canActivate: [MsalGuard],
      },
      {
        path: '',
        component: MainCardBodyManagerComponent,
        canActivate: [MsalGuard],
      },
    ],
  },
  {
    path: 'user/helpCenter',
    component: UserLayoutComponent,
    children: [
      { path: 'create/:id', component: CreateTicketComponent },
      { path: 'groupdetails/:id', component: GroupCategoryComponent },
      { path: '', component: MainCategoriesComponent },
    ],
  },
  {
    path: 'user',
    component: UserLayoutMainComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path: 'details/:id',
        component: UserDetailsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'myesclations',
        component: MyEsclationsComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'ticketshistory',
        component: TicketsHistoryComponent,
        canActivate: [MsalGuard],
      },
      { path: '', component: MyTicketsComponent, canActivate: [MsalGuard] },
    ],
  },
  { path: '', component: SharedComponent, canActivate: [MsalGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: ErrorMessageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
