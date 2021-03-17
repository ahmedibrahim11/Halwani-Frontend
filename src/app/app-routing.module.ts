import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './ITPersonal/home/home.component';
import { MainCardBodyComponent } from './ITPersonal/main-card-body/main-card-body.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'itpersonal', component: HomeComponent,
     children: [
      { path: "home", component: MainCardBodyComponent }
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
