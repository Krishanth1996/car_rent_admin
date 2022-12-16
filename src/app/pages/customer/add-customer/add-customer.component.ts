import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Customer } from 'src/app/model/customer';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  @Output() clearCustomerEvent = new EventEmitter<string>();
  constructor(public _common: CommonService, private _customerService: CustomerService) { }
  customer: Customer
  customerForm = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    license_card_number: new FormControl(),
    license_card_image: new FormControl(''),
    id_card_number: new FormControl(),
    id_card_image: new FormControl(''),
    utility_bill_image: new FormControl(''),
    contact_mobile: new FormControl(),
  });

  ngOnInit(): void {
  }

  setCustomer(customer: Customer) {
    this.customer = customer;
    this.customerForm.patchValue({
      first_name: customer.first_name,
      last_name: customer.last_name,
      license_card_number: customer.license_card_number,
      id_card_number: customer.id_card_number,
      contact_mobile: customer.contact_mobile,
    })
  }

  onFormSubmit() {
    const customerFormData = new FormData();
    customerFormData.append('license_card_image', this.customerForm.get('license_card_image').value);
    customerFormData.append('id_card_image', this.customerForm.get('id_card_image').value);
    customerFormData.append('utility_bill_image', this.customerForm.get('utility_bill_image').value);
    customerFormData.append('first_name', this.customerForm.get('first_name').value);
    customerFormData.append('last_name', this.customerForm.get('last_name').value);
    customerFormData.append('license_card_number', this.customerForm.get('license_card_number').value);
    customerFormData.append('id_card_number', this.customerForm.get('id_card_number').value);
    customerFormData.append('contact_mobile', this.customerForm.get('contact_mobile').value);
    if (this.customer) {
      this.updateCustomer();
    } else {
      this.createCustomer(customerFormData);
    }
  }

  updateCustomer() {
    this._customerService.updateCustomer(this.customerForm.value, this.customer.customer_id).subscribe(data => {
      this.clearForm()
    })
  }
  createCustomer(customerFormData: any) {
    this._customerService.createCustomer(customerFormData).subscribe(data => {
      this.customerForm.reset();
    })
  }

  clearForm() {
    this.customerForm.reset();
    this.clearCustomerEvent.emit(undefined)
  }

  onFileChange(event: any, type: string) {
    switch (type) {
      case 'id_card_image':
        this.customerForm.patchValue({
          id_card_image: this._common.setFile(event)
        });
        break;
      case 'utility_bill_image':
        this.customerForm.patchValue({
          utility_bill_image: this._common.setFile(event)
        });
        break;

      case 'license_card_image':
        this.customerForm.patchValue({
          license_card_image: this._common.setFile(event)
        });
        break;
      default:
        break;
    }
  }

}
