import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { Roles } from 'src/app/model/common';
import { User } from 'src/app/model/users';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userForm = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    license_card_number: new FormControl(),
    license_card_image: new FormControl(''),
    id_card_number: new FormControl(),
    id_card_image: new FormControl(''),
    utility_bill_image: new FormControl(''),
    contact_mobile: new FormControl(),
    email: new FormControl(),
    user_name: new FormControl(),
    password: new FormControl(),
    confirm_password: new FormControl(),
    role: new FormControl(),
    is_deleted: new FormControl(),
  });

  role=new FormControl('');
  roles:Roles[]=[]
  filteredRoles: Observable<Roles[]>;

  users: User[];
  selectedUser: User;
  dtOptions: any;

  selectedImage: string;
  constructor(private _userService: UserService, public _common: CommonService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers() {
    this._userService.getAllUsers().subscribe(data => {
      if (!data.isError) {
        this.users = data.data.users;
        this.roles = data.data.roles
        this.dtOptions = this._common.getDataTableSettings();

        this.filteredRoles = this.role.valueChanges.pipe(
          startWith(''),
          map(value => this._filterRole(value || '')),
        )
      }
    })
  }
  private _filterRole(value: string) {
    const filterValue = this._common._normalizeValue(value);
    return this.roles.filter(role => this._common._normalizeValue(role.name).includes(filterValue));
  }
  deleteCustomer(id: any) {
    this._userService.deleteUser(id).subscribe(data => {
      if (!data.isError) {
        this.users = this.users.filter(user => user.user_id != id)
      }
    })
  }

  selectOption(event:any){
    console.log(event);
    
  }
  selectCustomer(user: User) {
    this.selectedUser = user;
    // this.addCustomer.setCustomer(user);
  }

  clearCustomer(event: any) {
    this.selectedUser = undefined;
    // this.addCustomer.setCustomer(undefined)
    this.getAllUsers()
  }

  onFormSubmit() {
    const userFormData = new FormData();
    userFormData.append('license_card_image', this.userForm.get('license_card_image').value);
    userFormData.append('id_card_image', this.userForm.get('id_card_image').value);
    userFormData.append('utility_bill_image', this.userForm.get('utility_bill_image').value);
    userFormData.append('first_name', this.userForm.get('first_name').value);
    userFormData.append('last_name', this.userForm.get('last_name').value);
    userFormData.append('license_card_number', this.userForm.get('license_card_number').value);
    userFormData.append('id_card_number', this.userForm.get('id_card_number').value);
    userFormData.append('contact_mobile', this.userForm.get('contact_mobile').value);
    userFormData.append('email', this.userForm.get('email').value);
    userFormData.append('user_name', this.userForm.get('user_name').value);
    userFormData.append('password', this.userForm.get('password').value);
    if (this.selectedUser) {
      this.updateUser();
    } else {
      this.createUser(userFormData);
    }
  }

  selectUser(user:User){
    this.selectedUser=user
    this.userForm.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      contact_mobile: user.contact_mobile,
      user_name: user.user_name,
      email: user.contact_mobile,
      license_card_number: user.license_card_number,
      id_card_number: user.id_card_number,
    })
  }

  deleteUser(id:string){
    this._userService.deleteUser(id).subscribe(data=>{
      console.log(data);
      
    })
  }
  updateUser() {
    this._userService.updateUser(this.userForm.value, this.selectedUser.user_id).subscribe(data => {
      this.clearForm()
    })
  }
  clearForm() {
    this.userForm.reset();
    this.selectedUser= undefined
  }
  createUser(userFormData: any) {
    this._userService.createUser(userFormData).subscribe(data => {
      this.userForm.reset();
    })
  }

  onFileChange(event: any, type: string) {
    switch (type) {
      case 'id_card_image':
        this.userForm.patchValue({
          id_card_image: this._common.setFile(event)
        });
        break;
      case 'utility_bill_image':
        this.userForm.patchValue({
          utility_bill_image: this._common.setFile(event)
        });
        break;

      case 'license_card_image':
        this.userForm.patchValue({
          license_card_image: this._common.setFile(event)
        });
        break;
      default:
        break;
    }
  }
}
