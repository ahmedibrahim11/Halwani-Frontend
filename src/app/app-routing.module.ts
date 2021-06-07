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
import { ServiceRequestsComponent } from "./ITManager/service-requests/service-requests.component";
import { IncidentsComponent } from "./ITManager/incidents/incidents.component";
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
const routes: Routes = [
  {
    path: 'itpersonal',
    component: HomeComponent,
    children: [
      {path:'esclated',component:TicketEsclationsComponent},
      {path:'settings',component:SettingsMainTabsComponent},
      {path:'changes',component:PersonalChangesComponent},
      {path:'problems',component:PersonalProblemsComponent},
      {path:'incidents',component:PersonalIncidentsComponent},
      {path:'servicerequests',component:PersonalServiceRequestComponent,},
      { path: 'details/:id', component: TicketDetailsMainComponent },
      { path: '', component: MainCardBodyComponent },
    ],
  },
  {
    path: 'itmanager',
    component: ManagerhomeComponent,
    children: [
       {path:'esclated',component:TicketEsclationsComponent},
      {path:'settings',component:SettingsMainTabsComponent},
       {path:'changes',component:ChangesComponent},
      {path:'problems',component:ProblemsComponent},
      {path:'incidents',component:IncidentsComponent},
      {path:'servicerequests',component:ServiceRequestsComponent,},
      { path: 'details/:id', component: TicketDetailsMainComponent },
      { path: '', component: MainCardBodyManagerComponent },
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
  },{
    path: 'user',
    component: UserLayoutMainComponent,
    children: [
       { path: 'details/:id', component: UserDetailsComponent },
       { path: 'myesclations', component: MyEsclationsComponent },
      { path: 'ticketshistory', component: TicketsHistoryComponent },
       { path: '', component: MyTicketsComponent },
    ],
  },
  
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
