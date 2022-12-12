import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/orders';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders:Order[]
  dtOptions: any;

  constructor(
    private _orderService:OrderService,
    private _common:CommonService
  ) { }

  ngOnInit(): void {
    this._orderService.getAllOrders().subscribe(data=>{
      if(!data.isError){
        this.orders=data.data;
        this.dtOptions = this._common.getDataTableSettings();
      } 
    })
  }

}
