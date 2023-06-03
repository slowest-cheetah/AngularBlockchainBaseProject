import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { VerifyDocumentComponent } from './components/verify-document/verify-document.component';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';

const routes: Routes = [
  
  { path: 'home', component: HomeComponent },
  { path: 'verify-document', component: VerifyDocumentComponent },
  { path: 'add-organization', component: AddOrganizationComponent },
  { path: 'add-admin', component: AdminComponent },
  { path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
