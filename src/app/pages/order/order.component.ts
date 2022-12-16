import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/orders';
import { Vehicle } from 'src/app/model/vehicle';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: Order[]
  dtOptions: any;
  customerControl = new FormControl('');
  filteredCustomers: Observable<Customer[]>;
  customers: Customer[]
  vehicleControl = new FormControl('');
  filteredVehicles: Observable<Vehicle[]>;
  vehicles: Vehicle[]
  orderForm = new FormGroup({
    customer_id: new FormControl(),
    vehicle_id: new FormControl(),
    order_date: new FormControl(),
    rent_start_time: new FormControl(),
    rent_end_time: new FormControl(),
  })
  vehicleOwners: any;

  constructor(
    private _orderService: OrderService,
    private _common: CommonService,
    private _customer: CustomerService
  ) { }

  ngOnInit(): void {
    this._orderService.VehicleOrderWithCustomerVehicle().subscribe(dataList => {
      if (!dataList.isError) {

        this.orders = dataList.data.orders
        this.customers = dataList.data.customers
        this.vehicles = dataList.data.vehicles
        this.dtOptions = this._common.getDataTableSettings();

        this.filteredCustomers = this.customerControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterCustomer(value || '')),
        )
        this.filteredVehicles = this.vehicleControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterVehicle(value || '')),
        )
      }
    })
    // this._customer.getAllCustomers().subscribe(data => {
    //   if (!data.isError) {
    //     this.customers = data.data;
    //     this.filteredCustomers = this.customerControl.valueChanges.pipe(
    //       startWith(''),
    //       map(value => this._filterCustomer(value || '')),
    //     )
    //   }
    // });
  }

  onFormSubmit() {
    if (this.selectedOrder == undefined) {
      this._orderService.createOrder(this.orderForm.value).subscribe(data => {
        console.log(data);
        this.clearForm();
      })
    }
  }
  clearForm() {
    this.selectedOrder = undefined;
    this.orderForm.reset()
  }

  selectedOrder: Order
  selectOrder(item: Order) {
    this.selectedOrder = item;
    this.orderForm.patchValue({
      customer_id: this.selectedOrder.customer.customer_id,
      vehicle_id: this.selectedOrder.vehicle.vehicle_id,
      order_date: new Date(this.selectedOrder.order_date),
      rent_start_time: new Date(this.selectedOrder.rent_start_time),
      rent_end_time: new Date(this.selectedOrder.rent_end_time)
    })

  }

  deleteOrder(item: Order) {
    this._orderService.deleteOrder(item.order_id).subscribe(data => {
      if (!data.isError) {
        this.orders = this.orders.filter(x => x.order_id != item.order_id)
      }
    })
  }

  openProfileDialog(order: Order) {
    this._common.openProfileDialog(order.vehicle.owner);
  }

  openCustomerProfile(order: Order) {
    //implement customer view
    console.log(order.customer);
  }

  selectOption(event: any, type: string) {
    let value = event.option.value;
    if (type == 'C') {
      this.orderForm.patchValue({
        customer_id: value
      })
    } else {
      this.orderForm.patchValue({
        vehicle_id: value
      })
    }

  }
  getOrderStatus(item: Order) {
    let status = item.is_completed
    if (status) {
      return "Completed"
    } else {
      // if()
      return "Pending"
    }
  }

  private _filterCustomer(value: string) {
    const filterValue = this._normalizeValue(value);
    return this.customers.filter(customer => this._normalizeValue(customer.first_name + ' ' + customer.last_name).includes(filterValue));
  }
  private _filterVehicle(value: string) {
    const filterValue = this._normalizeValue(value);
    return this.vehicles.filter(vehicle => this._normalizeValue(vehicle.brand + ' ' + vehicle.name).includes(filterValue));
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
