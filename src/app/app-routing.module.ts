import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { IndexPageComponent } from './pages/common/index-page/index-page.component';
import { AddCustomerComponent } from './pages/customer/add-customer/add-customer.component';
import { ViewCustomersComponent } from './pages/customer/view-customers/view-customers.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path:"admin",
    component:AdminComponent,
    children:[
      {
        path:"customer",
        component:IndexPageComponent,
        children:[
          {
            path:"list",
            component:ViewCustomersComponent
          },
          {
            path:"list/add",
            component:AddCustomerComponent
          }
        ]
      }
    ]
  },
  {
    path:"",
    redirectTo:'/admin',
    pathMatch: 'full'
  },
  {
    path:"customer",
    redirectTo:'customer/add',
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
