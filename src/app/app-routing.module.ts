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
const routes: Routes = [
  {
    path: 'itpersonal',
    component: HomeComponent,
    children: [
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
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'create/:id', component: CreateTicketComponent },
      { path: 'groupdetails/:id', component: GroupCategoryComponent },
      { path: '', component: MainCategoriesComponent },
    ],
  },
  
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
