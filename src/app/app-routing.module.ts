import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './registry/login/login.component';
import { LogoutComponent } from './registry/logout/logout.component';
import { ForgetPwdComponent } from './registry/forget-pwd/forget-pwd.component';
import { PersonListComponent } from './registry/person-list/person-list.component';
import { PersonDetailComponent } from './registry/person-detail/person-detail.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'forgetPwd', component: ForgetPwdComponent},
  { path: 'personDetail', component: PersonDetailComponent},
  { path: 'personDetail/:ssn', component: PersonDetailComponent},
  { path: 'personList', component: PersonListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
