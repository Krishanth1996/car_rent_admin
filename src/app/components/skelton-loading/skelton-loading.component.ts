import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skelton-loading',
  templateUrl: './skelton-loading.component.html',
  styleUrls: ['./skelton-loading.component.scss']
})
export class SkeltonLoadingComponent implements OnInit {

  constructor() { }
  totalHead: number = 5;
  totalBody: number = 5;
  ngOnInit(): void {
  }

}
