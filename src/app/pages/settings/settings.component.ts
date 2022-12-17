import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PermissionSettings, Roles, Settings } from 'src/app/model/common';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private _settingsService:SettingsService) { }

  settings:Settings
  roles:Roles[]=[]
  selectionRole=new FormControl('');
  selectedRole:Roles
  keys:string[]=[]
  values:any
  ngOnInit(): void {
    this._settingsService.getAllSettings().subscribe(data=>{
      this.settings=data.data;
      this.roles=this.settings.roles
    })
  }

  setPermissions(event:any){
    this.selectedRole=this.roles.find(x=>x.role_id==this.selectionRole.value)
  }

  logVal(event:any){
    // selectedRole.permissions.orders.READ==true ? true:false
    console.log(event);
    
  }

}
