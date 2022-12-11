import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleOwnerService {

  path:string=environment.apiUrl;
  constructor(private http:HttpClient,private snackBar:SnackbarService) { }

  getAllVehicleOwner(){
    let url=this.path+"vehicle-owner";
    return this.http.get<any>(url);
  }

  createVehicleOwner(VehicleOwnerData:any){
    let url=this.path+"vehicle-owner";
    return this.http.post<any>(url,VehicleOwnerData);
  }

  getSingleVehicleOwner(id:any){
    let url=this.path+`vehicle-owner/${id}`;
    return this.http.get<any>(url);
  }

  updateVehicleOwner(VehicleOwnerData:any,id:any){
    let url=this.path+`vehicle-owner/${id}`;
    return this.http.put<any>(url,VehicleOwnerData);
  }

  deleteVehicleOwner(id:any){
    let url=this.path+`vehicle-owner/${id}`;
    return this.http.delete<any>(url);
  }
}
