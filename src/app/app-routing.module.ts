import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './ITPersonal/home/home.component';
import { MainCardBodyComponent } from './ITPersonal/main-card-body/main-card-body.component';
import { TicketDetailsMainComponent } from './ITPersonal/ticket-details-main/ticket-details-main.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'itpersonal', component: HomeComponent,
     children: [
      
      { path: "details/:id", component: TicketDetailsMainComponent },
{ path: "", component: MainCardBodyComponent },
    ]
  }
  ,
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
