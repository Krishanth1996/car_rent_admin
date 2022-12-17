import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  path: string = environment.apiUrl;
  constructor(private http: HttpClient, private snackBar: SnackbarService) { }

  getAllSettings() {
    let url = this.path + "user/settings";
    return this.http.get<any>(url);
  }
}
