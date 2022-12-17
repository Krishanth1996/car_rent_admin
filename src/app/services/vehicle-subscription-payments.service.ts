import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleSubscriptionPaymentsService {


  path: string = environment.apiUrl;
  constructor(private http: HttpClient, private snackBar: SnackbarService) { }

  getAllVehicleSubscriptionPayments() {
    let url = this.path + "vehicle-subscription-payment";
    return this.http.get<any>(url);
  }

  createVehicleSubscriptionPayment(data: any) {
    let url = this.path + "vehicle-subscription-payment";
    return this.http.post<any>(url, data);
  }

  updateVehicleSubscriptionPayment(data: any, id: any) {
    let url = this.path + `vehicle-subscription-payment/${id}`;
    return this.http.put<any>(url, data);
  }

  deleteVehicleSubscriptionPayment(id: any) {
    let url = this.path + `vehicle-subscription-payment/${id}`;
    return this.http.delete<any>(url);
  }

  createSubscriptionType(data: any) {
    let url = this.path + "vehicle-subscription";
    return this.http.post<any>(url, data);
  }

  updateSubscriptionType(data: any, id: any) {
    let url = this.path + `vehicle-subscription/${id}`;
    return this.http.put<any>(url, data);
  }

  getAllSubscriptionTypes(){
    let url=this.path+"vehicle-subscription";
    return this.http.get<any>(url);
  }
  deleteSubscriptionType(id: any) {
    let url = this.path + `vehicle-subscription/${id}`;
    return this.http.delete<any>(url);
  }
}
