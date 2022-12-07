import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API } from '../model/common';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleLocationService {

  constructor(private http:HttpClient,private snackBar:SnackbarService) { }

  path:string=environment.apiUrl;

  getAllLocations(){
    let url=this.path+"vehicle-location";
    return this.http.get<API>(url).pipe(
      catchError(error => {
         this.snackBar.getServerErrorMessage(error);
        return error;
      })
  );
  }
}
