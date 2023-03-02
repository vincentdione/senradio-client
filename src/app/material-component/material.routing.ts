import { ManageHistoriqueComponent } from './manage-historique/manage-historique.component';
import { RadioDetailComponent } from './components/radio-detail/radio-detail.component';
import { ManageRadioComponent } from './manage-radio/manage-radio.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageHospitalComponent } from './manage-hospital/manage-hospital.component';
import { RouteGuardService } from './../services/route-guard.service';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';


export const MaterialRoutes: Routes = [
  {path:'patient', component:ManagePatientComponent,
    canActivate:[RouteGuardService],
    data : {
     expectedRole: ["ROLE_DOCTEUR","ROLE_SECRETAIRE"]
    }
   },
   {path:'hopital', component:ManageHospitalComponent,
   canActivate:[RouteGuardService],
   data : {
    expectedRole: ["ROLE_DOCTEUR","ROLE_SECRETAIRE"]
   }
  },
  {path:'users', component:ManageUsersComponent,
   canActivate:[RouteGuardService],
   data : {
    expectedRole: ["ROLE_ADMIN"]
   }
  },
  {path:'radios', component:ManageRadioComponent,
   canActivate:[RouteGuardService],
   data : {
    expectedRole: ["ROLE_DOCTEUR","ROLE_SECRETAIRE"]
   }
  },
  {path:'radios/:id', component:RadioDetailComponent,
   canActivate:[RouteGuardService],
   data : {
    expectedRole: ["ROLE_DOCTEUR"]
   }
  },
  {path:'historique', component:ManageHistoriqueComponent,
   canActivate:[RouteGuardService],
   data : {
    expectedRole: ["ROLE_ADMIN"]
   }
  }
];
