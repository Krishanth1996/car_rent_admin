import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  path:string=environment.apiUrl;
  constructor(private http:HttpClient,private snackBar:SnackbarService) { }

  getAllVehicles(){
    let url=this.path+"vehicle";
    return this.http.get<any>(url);
  }

  createVehicle(vehicleData:any){
    let url=this.path+"vehicle";
    return this.http.post<any>(url,vehicleData);
  }

  updateVehicle(vehicleData:any,id:any){
    let url=this.path+`vehicle/${id}`;
    return this.http.put<any>(url,vehicleData);
  }

  deleteVehicle(id:any){
    let url=this.path+`vehicle/${id}`;
    return this.http.delete<any>(url);
  }
}
