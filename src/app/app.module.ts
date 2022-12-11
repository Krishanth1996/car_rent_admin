import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './layout/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { ContentComponent } from './layout/content/content.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AddCustomerComponent } from './pages/customer/add-customer/add-customer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './network.interceptor';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ViewCustomersComponent } from './pages/customer/view-customers/view-customers.component';
import { DataTablesModule } from 'angular-datatables';
import { IndexPageComponent } from './pages/common/index-page/index-page.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AddVehicleComponent } from './pages/vehicle/add-vehicle/add-vehicle.component';
import { ViewVehicleComponent } from './pages/vehicle/view-vehicle/view-vehicle.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';
import { environment } from 'src/environments/environment';
// import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    NotFoundComponent,
    AddCustomerComponent,
    SnackbarComponent,
    ViewCustomersComponent,
    IndexPageComponent,
    ImageModalComponent,
    AddVehicleComponent,
    ViewVehicleComponent,
    ProfileModalComponent,
  ],
  imports: [
    // AgmCoreModule.forRoot({
    //   apiKey: environment.mapsApiKey
    // }),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DataTablesModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:NetworkInterceptor,
    multi:true
  },{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
