import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  path:string=environment.apiUrl;
  constructor(private http:HttpClient,private snackBar:SnackbarService) { }

  getAllLocations(){
    let url=this.path+"vehicle-location";
    return this.http.get<any>(url);
  }

  createLocation(LocationData:any){
    let url=this.path+"vehicle-location";
    return this.http.post<any>(url,LocationData);
  }

  getSingleVehicleLocation(id:any){
    let url=this.path+`vehicle-location/${id}`;
    return this.http.get<any>(url);
  }

  updateLocation(LocationData:any,id:any){
    let url=this.path+`vehicle-location/${id}`;
    return this.http.put<any>(url,LocationData);
  }

  deleteLocation(id:any){
    let url=this.path+`vehicle-location/${id}`;
    return this.http.delete<any>(url);
  }
}
