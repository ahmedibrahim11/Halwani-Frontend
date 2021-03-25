import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './ITPersonal/home/home.component';
import { ManagerhomeComponent } from './ITManager/managerhome/managerhome.component';

import { MainCardBodyComponent } from './ITPersonal/main-card-body/main-card-body.component';
import { MainCardBodyManagerComponent } from './ITManager/main-card-body-manager/main-card-body-manager.component';

import { TicketDetailsMainComponent } from './ITPersonal/ticket-details-main/ticket-details-main.component';
import { TicketDetailsManagerComponent } from './ITManager/ticket-details-manager/ticket-details-manager.component';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'itpersonal',
    component: HomeComponent,
    children: [
      { path: 'details/:id', component: TicketDetailsMainComponent },
      { path: '', component: MainCardBodyComponent },
    ],
  },
  {
    path: 'itmanager',
    component: ManagerhomeComponent,
    children: [
      { path: 'details/:id', component: TicketDetailsManagerComponent },
      { path: '', component: MainCardBodyManagerComponent },
    ],
  },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
