import { RouteGuardService } from './services/route-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'workspace',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/workspace/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
          canActivate: [RouteGuardService],
          data : {
            expectedRole: ["ROLE_DOCTEUR","ROLE_ADMIN","ROLE_SECRETAIRE"]
          }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [RouteGuardService],
          data : {
            expectedRole: ["ROLE_DOCTEUR","ROLE_ADMIN","ROLE_SECRETAIRE"]
          }
      }
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
