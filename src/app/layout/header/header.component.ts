import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  //Drawer Open Close values from admin layout
  @Input() isDrawer: boolean = false;
  @Input() drawer: MatDrawer;

  constructor(public _US:UserService) { }

  ngOnInit(): void {
  }

}
