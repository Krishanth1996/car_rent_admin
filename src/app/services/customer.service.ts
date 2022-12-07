import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  path:string=environment.apiUrl;
  constructor(private http:HttpClient,private snackBar:SnackbarService) { }

  getAllCustomers(){
    let url=this.path+"customer";
    return this.http.get<any>(url);
  }

  createCustomer(customerData:any){
    let url=this.path+"customer";
    return this.http.post<any>(url,customerData);

  }
}
