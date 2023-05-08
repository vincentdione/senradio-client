import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { PatientComponent } from './dialog/patient/patient.component';
import { ManageHospitalComponent } from './manage-hospital/manage-hospital.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { HopitalComponent } from './dialog/hopital/hopital.component';
import { UserComponent } from './dialog/user/user.component';
import { ManageRadioComponent } from './manage-radio/manage-radio.component';
import { RadioComponent } from './dialog/radio/radio.component';
import { RadioDetailComponent } from './components/radio-detail/radio-detail.component';
import { ImgViewComponent } from './components/img-view/img-view.component';
import { ManageHistoriqueComponent } from './manage-historique/manage-historique.component';
import { ManageFactureComponent } from './manage-facture/manage-facture.component';
import { ImputerDocteurComponent } from './components/imputer-docteur/imputer-docteur.component';
import { ManageRadioDocteurComponent } from './manage-radio-docteur/manage-radio-docteur.component';
import { ManageUsersAdminComponent } from './manage-users-admin/manage-users-admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManagePatientComponent,
    PatientComponent,
    ManageHospitalComponent,
    ManageUsersComponent,
    HopitalComponent,
    UserComponent,
    ManageRadioComponent,
    RadioComponent,
    RadioDetailComponent,
    ImgViewComponent,
    ManageHistoriqueComponent,
    ManageFactureComponent,
    ImputerDocteurComponent,
    ManageRadioDocteurComponent,
    ManageUsersAdminComponent
  ]
})
export class MaterialComponentsModule {}
