import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm=new FormGroup({
    user_name:new FormControl(),
    password:new FormControl()
  })
  constructor(private authService:UserService,private router: Router) { }

  ngOnInit(): void {
   if(this.authService.isLoggedIn()){
      this.router.navigate(['/admin/dashboard'])
    }
  }

  onSubmit(){
    this.authService.loginUser(this.loginForm.value).subscribe(data=>{
      this.authService.setSession(data.data);
      this.authService.isLoggedIn()
      this.router.navigate(['/admin/dashboard'])

    })
  }

}
