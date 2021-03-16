import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCardBodyComponent } from '../ITPersonal/main-card-body/main-card-body.component';
import { ITPersinalLayoutComponent } from './itpersinal-layout/itpersinal-layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'itpersonal/home',component:ITPersinalLayoutComponent,children:[{
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
