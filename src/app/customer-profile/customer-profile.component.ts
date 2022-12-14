/* eslint-disable @ngrx/prefer-action-creator-in-dispatch */
/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { DbcallingService } from '../core/services/dbcalling.service';
import { CustomerRegister } from '../Store/customerregister';
import { LoginModel } from '../Store/LoginModel';

import * as pageStore from 'src/app/Store/PageStore/Page.Actions';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
customerRegister: CustomerRegister
loginModel: LoginModel;

userProfile: any = [];
dbResult: any = [];

constructor(
  private router: Router,
  private dbCallingservice: DbcallingService,
  private store: Store<any>
) { 
  this.customerRegister = new CustomerRegister();
}


 
ngOnInit(): void {
  debugger;
  try{
    debugger;
    var result1 = this.store.source['value']['PrintWebsite'].filter((x) => {
      return x.viewName  == 'Login';
    });

    if (result1.length > 0) {
      this.loginModel = Object.assign({}, result1[0]);
      if (+this.loginModel.User_Id > 0) {
        if(this.loginModel.User_Name != '') {
          this.router.navigateByUrl('customerprofile');
        }
      }
    }
  }
  catch(e) { }

  this.viewProfile();
}

viewProfile() {
  debugger;
  this.dbCallingservice.viewProfileDetails(this.loginModel).subscribe((result) => {
    debugger;
    this.userProfile = result;
    if(this.userProfile.data.length > 0) {
      debugger;
      if(this.userProfile.data[0].Customer_Id > 0 ) {
        this.customerRegister = this.userProfile.data[0];
        this.customerRegister.Confirm_Password = this.customerRegister.Password
      }
    }
  });
}

DeleteClick() {
  
  Swal.fire({
    title: ('Are you sure'),
    text: ('Do you want to delete? Your account will be Deleted!'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: ('Yes'),
    cancelButtonText: ('No')
  }).then((result) => {
    if (result.value) {
      this.deleteProfile();
    } 
    else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        ('Cancelled'),
        ('your record is safe'),
        'error'
      );
    }
  });
}


deleteProfile() { 
  debugger;
  this.dbCallingservice.deleteProfile(this.customerRegister).subscribe((res) => {
    debugger;
    this.dbResult = res;

    if(this.dbResult.data[0].NumOfRows > 0) {
      Swal.fire({
        text: 'Your Profile is Deleted !',
        icon: 'success'
      });

      this.loginModel = new LoginModel();
      this.store.dispatch(new pageStore.OpenPage(Object.assign({} , this.loginModel)));
    }
    this.router.navigateByUrl('/customerregister');
  });
  
}

home() {
  this.router.navigateByUrl(''); 
}

}