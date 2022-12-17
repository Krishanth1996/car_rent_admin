import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private snackBar:SnackbarService,public router:Router) { }

  path:string=environment.apiUrl;

  loginUser(data:any){
    return this.http.post<any>(this.path+'auth', data)
    
  }
  setSession(authResult:any) {
    // const expiresAt = moment().add(authResult.expiresIn,'second');

    sessionStorage.setItem('sessionToken', authResult.token);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

  logout() {
    sessionStorage.removeItem("sessionToken");
    // sessionStorage.removeItem("expires_at");
    this.router.navigate(['']);
  }

  public isLoggedIn() {
    return sessionStorage.getItem("sessionToken");
      // return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      // const expiration = localStorage.getItem("expires_at");
      // const expiresAt = JSON.parse(expiration);
      // return moment(expiresAt);
  }    

  getAllUsers(){
    let url=this.path+"auth";
    return this.http.get<any>(url);
  }

  createUser(userData:any){
    let url=this.path+"user/create";
    return this.http.post<any>(url,userData);
  }

  updateUser(userData:any,id:any){
    let url=this.path+`user/${id}`;
    return this.http.put<any>(url,userData);
  }

  deleteUser(id:any){
    let url=this.path+`user/${id}`;
    return this.http.delete<any>(url);
  }
}
