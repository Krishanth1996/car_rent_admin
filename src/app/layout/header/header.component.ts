import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  //Drawer Open Close values from admin layout
  @Input() isDrawer: boolean = false;
  @Input() drawer: MatDrawer;

  constructor() { }

  ngOnInit(): void {
  }

}
