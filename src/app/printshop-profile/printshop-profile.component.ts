/* eslint-disable @ngrx/prefer-action-creator-in-dispatch */
/* eslint-disable @ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { DbcallingService } from '../core/services/dbcalling.service';
import { LoginModel } from '../Store/LoginModel';
import { PrintShopRegister } from '../Store/printshopregister';

import * as pageStore from 'src/app/Store/PageStore/Page.Actions';


@Component({
  selector: 'app-printshop-profile',
  templateUrl: './printshop-profile.component.html',
  styleUrls: ['./printshop-profile.component.css']
})
export class PrintshopProfileComponent implements OnInit {

  shopRegister: PrintShopRegister;
  loginModel: LoginModel;

  userProfile: any = [];
  dbResult: any = [];

  constructor(
    private router: Router,
    private dbCallingservice: DbcallingService,
    private store: Store<any>
  ) { 
    this.shopRegister = new PrintShopRegister();
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
            this.router.navigateByUrl('printshopprofile');
          }
        }
      }
    }
    catch(e) { }

    this.viewProfile();
  }

  viewProfile() {
    this.dbCallingservice.viewProfileDetails(this.loginModel).subscribe((result) => {
      debugger;
      this.userProfile = result;
      if(this.userProfile.data.length > 0) {
        debugger;
        if(this.userProfile.data[0].Shop_Id > 0 ) {
          this.shopRegister = this.userProfile.data[0];
          this.shopRegister.Confirm_Password = this.shopRegister.Password;
        }
      }
    });
  }

  deleteClick() {
    
    Swal.fire({
      title: ('Are you sure'),
      text: ('Do you want to delete'),
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
  this.dbCallingservice.deleteProfile(this.shopRegister).subscribe((res) => {
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

  updateClick() {
    debugger;
  if((this.shopRegister.Password == this.shopRegister.Confirm_Password) && 
     (this.shopRegister.Email != '') && (this.shopRegister.User_Name != '')) {
    this.dbCallingservice.updatePrintShopProfile(this.shopRegister).subscribe((res) => {
      debugger;
      this.dbResult = res;
      if(this.dbResult.data[0].ID > 0) {  
        if(this.dbResult.data[0].NumOfRows > 0) {
          Swal.fire({
            text: 'The Profile is updated!',
            icon: 'success'
          });
        }

        this.viewProfile();
      }
    });
  }
  else {
    Swal.fire({
      text: 'Password & Confirm Password should Match!',
      icon: 'warning'
    });
  }
  }

  home() {
    this.router.navigateByUrl('');
  }

}
