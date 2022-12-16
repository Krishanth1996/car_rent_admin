import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  path: string = environment.apiUrl;
  constructor(private http: HttpClient, private snackBar: SnackbarService) { }

  getDashboardMetrics() {
    let url = this.path + "dashboard-details";
    return this.http.get<any>(url);
  }

}