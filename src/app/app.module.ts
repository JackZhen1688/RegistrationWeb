import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//ngx-mask Module
import { NgxMaskModule } from 'ngx-mask';
//Material Module
import { MatTableModule,
         MatInputModule,
         MatSelectModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatIconModule,
         MatDialogModule,
         MatSnackBarModule  } from '@angular/material'; 
//Registry Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './registry/login/login.component';
import { LogoutComponent } from './registry/logout/logout.component';
import { ForgetPwdComponent } from './registry/forget-pwd/forget-pwd.component';
import { PersonListComponent } from './registry/person-list/person-list.component';
import { PersonDetailComponent } from './registry/person-detail/person-detail.component';
import { NotFoundComponent } from './registry/not-found/not-found.component';
import { DialogMessageComponent } from './registry/dialogs/dialog-message/dialog-message.component';
import { DialogMessageYesnoComponent } from './registry/dialogs/dialog-message-yesno/dialog-message-yesno.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    PersonListComponent,
    PersonDetailComponent,
    NotFoundComponent,
    ForgetPwdComponent,
    DialogMessageComponent,
    DialogMessageYesnoComponent
  ],
  entryComponents:[
    DialogMessageComponent,
    DialogMessageYesnoComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShowHidePasswordModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
