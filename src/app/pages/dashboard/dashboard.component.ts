import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _dashBoardService: DashboardService) { }
  dashboardData: any
  ngOnInit(): void {
    this._dashBoardService.getDashboardMetrics().subscribe(data => {
      if (!data.isError) {
        console.log(data);

        this.dashboardData = data.data[0]
      }
    })
  }

}
