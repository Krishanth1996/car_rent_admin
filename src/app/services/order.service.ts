import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  path:string=environment.apiUrl;
  constructor(private http:HttpClient,private snackBar:SnackbarService) { }

  getAllOrders(){
    let url=this.path+"vehicle-order";
    return this.http.get<any>(url);
  }

  createOrder(orderData:any){
    let url=this.path+"vehicle-order";
    return this.http.post<any>(url,orderData);
  }

  updateOrder(orderData:any,id:any){
    let url=this.path+`vehicle-order/${id}`;
    return this.http.put<any>(url,orderData);
  }

  deleteOrder(id:any){
    let url=this.path+`vehicle-order/${id}`;
    return this.http.delete<any>(url);
  }
}