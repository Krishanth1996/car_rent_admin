import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { ViewCustomersComponent } from './pages/customer/view-customers/view-customers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrderComponent } from './pages/order/order.component';
import { ViewVehicleComponent } from './pages/vehicle/view-vehicle/view-vehicle.component';

const routes: Routes = [
  {
    path:"",
    component:AdminComponent,
    children:[
      {
        path:"dashboard",
        component:DashboardComponent,
        // children:[
        //   {
        //     path:"list",
        //     component:ViewCustomersComponent
        //   },
        //   {
        //     path:"list/add",
        //     component:AddCustomerComponent
        //   }
        // ]
      },
      {
        path:"customer",
        component:ViewCustomersComponent,
        // children:[
        //   {
        //     path:"list",
        //     component:ViewCustomersComponent
        //   },
        //   {
        //     path:"list/add",
        //     component:AddCustomerComponent
        //   }
        // ]
      },
      {
        path:"vehicle",
        component:ViewVehicleComponent
      },
      {
        path:"orders",
        component:OrderComponent
      }
    ]
  },
  {
    path:"",
    redirectTo:'/dashboard',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
