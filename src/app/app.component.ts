import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vehicle_rent_admin';
  loading$ = this.loader.loading$;

  constructor(private loader:LoadingService){
  }


}
