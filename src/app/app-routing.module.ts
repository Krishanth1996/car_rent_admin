import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { ViewCustomersComponent } from './pages/customer/view-customers/view-customers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrderComponent } from './pages/order/order.component';
import { PackageComponent } from './pages/package/package.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersComponent } from './pages/users/users.component';
import { VehicleSubscriptionPaymentComponent } from './pages/vehicle-subscription-payment/vehicle-subscription-payment.component';
import { ViewVehicleComponent } from './pages/vehicle/view-vehicle/view-vehicle.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service'
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "customer",
        component: ViewCustomersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "vehicle",
        component: ViewVehicleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "orders",
        component: OrderComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "vehicle-subscription-payments",
        component: VehicleSubscriptionPaymentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "vehicle-subscription",
        component: PackageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "users",
        component: UsersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "settings",
        component: SettingsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path: "",
    component:AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
