import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSerializer } from '@angular/router';
import { TicketDetailsMainComponent } from 'src/ITPersonal/ticket-details-main/ticket-details-main.component';
import { MainCardBodyComponent } from '../ITPersonal/main-card-body/main-card-body.component';
import { ITPersinalLayoutComponent } from './itpersinal-layout/itpersinal-layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'itpersonal',component:ITPersinalLayoutComponent,children:[{
      path: 'ticketdetails/:id',
    component: TicketDetailsMainComponent,
    outlet: 'itpersonal',
    
    },{
        path: '',
        outlet: 'itpersonal',
        component: MainCardBodyComponent,
        
    }]  }
   ,
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule {}
