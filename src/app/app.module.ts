import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { VerifyDocumentComponent } from './components/verify-document/verify-document.component';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NavbarComponent,
    HomeComponent,
    VerifyDocumentComponent,
    AddOrganizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
