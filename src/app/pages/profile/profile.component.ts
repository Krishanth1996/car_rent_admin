import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  profileForm=new FormGroup({
    first_name:new FormControl(),
    last_name:new FormControl(),
    email:new FormControl(),
    user_name:new FormControl(),
    contact_mobile:new FormControl(),
    id_card_number:new FormControl(),
    license_card_number:new FormControl(),
  })
  user:any
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    
  }

}
